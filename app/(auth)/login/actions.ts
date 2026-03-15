"use server";

import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server-client";

function getString(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

export type AuthFormState = {
  error?: string;
  message?: string;
};

export async function login(_: AuthFormState, formData: FormData): Promise<AuthFormState> {
  const email = getString(formData, "email");
  const password = getString(formData, "password");

  if (!email || !password) {
    return { error: "Enter your email and password." };
  }

  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password
  });

  if (error) {
    if (error.message.toLowerCase().includes("email not confirmed")) {
      return {
        error: "Your email has not been confirmed yet. Check your inbox for the confirmation email."
      };
    }

    return { error: error.message };
  }

  redirect("/dashboard");
}
