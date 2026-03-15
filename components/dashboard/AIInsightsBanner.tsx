import { Sparkles } from "lucide-react";

import { Card } from "@/components/ui/card";

export function AIInsightsBanner({ insights }: { insights: string[] }) {
  return (
    <Card className="overflow-hidden border-primary/30 bg-[linear-gradient(135deg,rgba(37,99,235,0.18),rgba(15,23,42,0.85)_38%,rgba(17,24,39,0.95))] shadow-[0_20px_50px_rgba(15,23,42,0.28)]">
      <div className="flex flex-col gap-4 p-6 sm:flex-row sm:items-start sm:gap-5">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,rgba(99,102,241,1),rgba(59,130,246,1))] text-white shadow-[0_18px_32px_rgba(37,99,235,0.35)]">
          <Sparkles className="h-6 w-6" />
        </div>
        <div className="space-y-3">
          <div>
            <p className="text-xl font-semibold text-foreground">AI Insights</p>
          </div>
          <ul className="space-y-2 text-base text-slate-200">
            {insights.map((insight) => (
              <li key={insight} className="flex items-start gap-3">
                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-sky-300" />
                <span>{insight}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Card>
  );
}
