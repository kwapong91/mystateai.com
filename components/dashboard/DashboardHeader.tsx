import type { ReactNode } from "react";

export function DashboardHeader({
  title,
  subtitle,
  actions
}: {
  title: string;
  subtitle: string;
  actions?: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
      <div className="space-y-2">
        <h1 className="text-4xl font-semibold tracking-tight text-foreground">{title}</h1>
        <p className="max-w-2xl text-lg text-muted-foreground">{subtitle}</p>
      </div>
      {actions ? <div className="shrink-0">{actions}</div> : null}
    </div>
  );
}
