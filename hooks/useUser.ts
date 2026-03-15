"use client";

import type { User } from "@supabase/supabase-js";
import { useEffect, useState } from "react";

import { createClient } from "@/lib/supabase/browser-client";

export function useUser() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    let unsubscribe: (() => void) | undefined;

    const initialize = async () => {
      try {
        const supabase = createClient();

        const {
          data: { user: currentUser }
        } = await supabase.auth.getUser();

        if (!mounted) return;

        setUser(currentUser);
        setLoading(false);

        const {
          data: { subscription }
        } = supabase.auth.onAuthStateChange((_, session) => {
          if (!mounted) return;

          setUser(session?.user ?? null);
          setLoading(false);
        });

        unsubscribe = () => subscription.unsubscribe();
      } catch (error) {
        console.error("Failed to initialize auth user state", error);

        if (!mounted) return;

        setUser(null);
        setLoading(false);
      }
    };

    initialize();

    return () => {
      mounted = false;
      unsubscribe?.();
    };
  }, []);

  return { user, loading };
}
