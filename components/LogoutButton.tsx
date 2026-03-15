"use client";

import { LogOut } from "lucide-react";

import { logout } from "@/app/actions/logout";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function LogoutButton({ collapsed = false }: { collapsed?: boolean }) {
  return (
    <form action={logout}>
      <Button
        type="submit"
        variant="outline"
        className={cn("w-full justify-start gap-2", collapsed && "w-10 justify-center px-0")}
      >
        <LogOut className="h-4 w-4 shrink-0" />
        {!collapsed ? <span>Logout</span> : null}
      </Button>
    </form>
  );
}
