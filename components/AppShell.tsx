import type { ReactNode } from "react";

import { Sidebar } from "@/components/Sidebar";
import { cn } from "@/lib/utils";

export function AppShell({
  children,
  rightPanel
}: {
  children: ReactNode;
  rightPanel?: ReactNode;
}) {
  return (
    <div className="min-h-screen lg:flex">
      <Sidebar />
      <div className="flex-1">
        <div className={cn("mx-auto grid min-h-screen max-w-[1800px] gap-6 px-4 py-4 lg:px-6 lg:py-6", rightPanel ? "xl:grid-cols-[minmax(0,1fr)_360px]" : "")}>
          <main className="min-w-0">{children}</main>
          {rightPanel ? <aside className="hidden xl:block">{rightPanel}</aside> : null}
        </div>
      </div>
    </div>
  );
}
