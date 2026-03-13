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
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const items = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/opportunities", label: "Opportunities", icon: BriefcaseBusiness },
  { href: "/opportunities", label: "AI Analysis", icon: Sparkles },
  { href: "/saved-opportunities", label: "Saved Opportunities", icon: Star },
  { href: "/partners", label: "Partners", icon: Network },
  { href: "/documents", label: "Documents", icon: FileStack },
  { href: "/settings", label: "Settings", icon: Settings }
];

export function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

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
        {items.map(({ href, label, icon: Icon }) => {
          const active = pathname === href || (href === "/opportunities" && pathname.startsWith("/opportunities"));
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
        <div className={cn("flex items-center gap-3 rounded-2xl bg-secondary/60 p-3", collapsed && "justify-center")}>
          <Avatar>
            <AvatarFallback>IV</AvatarFallback>
          </Avatar>
          {!collapsed && (
            <div>
              <p className="text-sm font-medium">Ivan Contractor</p>
              <p className="text-xs text-muted-foreground">Growth + Capture Lead</p>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
