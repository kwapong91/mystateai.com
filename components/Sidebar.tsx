"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BookText,
  BriefcaseBusiness,
  ChevronLeft,
  ChevronRight,
  FileStack,
  LayoutDashboard,
  Network,
  Settings,
  Sparkles,
  Star
} from "lucide-react";
import { useState } from "react";

import { ThemeToggle } from "@/components/ThemeToggle";
import { LogoutButton } from "@/components/LogoutButton";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useUser } from "@/hooks/useUser";
import { cn } from "@/lib/utils";

const items = [
  {
    href: "/dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
    isActive: (pathname: string) => pathname === "/dashboard"
  },
  {
    href: "/opportunities",
    label: "Opportunities",
    icon: BriefcaseBusiness,
    isActive: (pathname: string) => pathname === "/opportunities"
  },
  {
    href: "/analysis",
    label: "AI Analysis",
    icon: Sparkles,
    isActive: (pathname: string) => pathname === "/analysis" || /^\/opportunities\/[^/]+$/.test(pathname)
  },
  {
    href: "/saved-opportunities",
    label: "Saved Opportunities",
    icon: Star,
    isActive: (pathname: string) => pathname === "/saved-opportunities"
  },
  {
    href: "/partners",
    label: "Partners",
    icon: Network,
    isActive: (pathname: string) => pathname === "/partners"
  },
  {
    href: "/documents",
    label: "Documents",
    icon: FileStack,
    isActive: (pathname: string) => pathname === "/documents"
  },
  {
    href: "/settings",
    label: "Settings",
    icon: Settings,
    isActive: (pathname: string) => pathname === "/settings"
  }
];

export function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const { user, loading } = useUser();
  const email = user?.email ?? "Not signed in";
  const initials = user?.email?.slice(0, 2).toUpperCase() ?? "MS";

  return (
    <aside
      className={cn(
        "flex h-screen flex-col border-r border-border/70 bg-card/80 px-3 py-4 backdrop-blur-xl transition-all duration-200",
        collapsed ? "w-[88px]" : "w-[280px]"
      )}
    >
      <div className="flex items-center justify-between gap-2 px-2">
        <div className="flex items-center gap-3">
          <div className="rounded-2xl bg-primary p-2.5 text-primary-foreground">
            <BookText className="h-5 w-5" />
          </div>
          {!collapsed && (
            <div>
              <p className="font-semibold tracking-tight">mystateai</p>
              <p className="text-xs text-muted-foreground">AI for Government Contracting</p>
            </div>
          )}
        </div>
        <Button variant="ghost" size="icon" onClick={() => setCollapsed((current) => !current)}>
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>
      </div>

      <nav className="mt-8 flex-1 space-y-1">
        {items.map(({ href, label, icon: Icon, isActive }) => {
          const active = isActive(pathname);
          return (
            <Link
              key={label}
              href={href}
              className={cn(
                "flex items-center gap-3 rounded-2xl px-3 py-3 text-sm font-medium transition-colors",
                active
                  ? "bg-primary text-primary-foreground shadow-soft"
                  : "text-muted-foreground hover:bg-secondary hover:text-foreground"
              )}
            >
              <Icon className="h-4 w-4 shrink-0" />
              {!collapsed && <span>{label}</span>}
            </Link>
          );
        })}
      </nav>

      <div className="space-y-4 border-t border-border/70 px-2 pt-4">
        <div className={cn("flex items-center gap-3", collapsed && "justify-center")}>
          <ThemeToggle />
        </div>
        <div className={cn(collapsed ? "flex justify-center" : "")}>
          <LogoutButton collapsed={collapsed} />
        </div>
        <div className={cn("flex items-center gap-3 rounded-2xl bg-secondary/60 p-3", collapsed && "justify-center")}>
          <Avatar>
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
          {!collapsed && (
            <div>
              <p className="text-sm font-medium">{loading ? "Loading..." : email}</p>
              <p className="text-xs text-muted-foreground">Authenticated workspace</p>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
