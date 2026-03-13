"use client";

import { Bookmark, BookmarkCheck } from "lucide-react";
import { useEffect, useState, useTransition } from "react";

import { Button } from "@/components/ui/button";

const storageKey = "mystateai-saved-opportunities";

function loadSavedIds() {
  if (typeof window === "undefined") return new Set<string>();
  try {
    return new Set<string>(JSON.parse(window.localStorage.getItem(storageKey) ?? "[]") as string[]);
  } catch {
    return new Set<string>();
  }
}

function persistSavedIds(ids: Set<string>) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(storageKey, JSON.stringify(Array.from(ids)));
  window.dispatchEvent(new CustomEvent("mystateai:saved-opportunities-changed"));
}

export function SaveOpportunityButton({ opportunityId }: { opportunityId: string }) {
  const [saved, setSaved] = useState(false);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    const sync = () => setSaved(loadSavedIds().has(opportunityId));
    sync();
    window.addEventListener("mystateai:saved-opportunities-changed", sync as EventListener);
    return () => window.removeEventListener("mystateai:saved-opportunities-changed", sync as EventListener);
  }, [opportunityId]);

  const onToggle = () => {
    startTransition(async () => {
      const ids = loadSavedIds();
      if (ids.has(opportunityId)) {
        ids.delete(opportunityId);
        setSaved(false);
      } else {
        ids.add(opportunityId);
        setSaved(true);
      }
      persistSavedIds(ids);

      try {
        await fetch("/api/save", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ opportunityId, saved: ids.has(opportunityId) })
        });
      } catch {
        // Keep the optimistic UI state when persistence is unavailable.
      }
    });
  };

  return (
    <Button variant={saved ? "secondary" : "outline"} size="sm" onClick={onToggle} disabled={isPending}>
      {saved ? <BookmarkCheck className="mr-2 h-4 w-4" /> : <Bookmark className="mr-2 h-4 w-4" />}
      {saved ? "Saved" : "Save Opportunity"}
    </Button>
  );
}
