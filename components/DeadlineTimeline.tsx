import { CalendarClock } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

function extractDate(value: string) {
  const match = value.match(
    /\b(?:January|February|March|April|May|June|July|August|September|October|November|December)\s+\d{1,2},\s+\d{4}|\b\d{1,2}\/\d{1,2}\/\d{4}\b/i
  );
  if (!match) return null;

  const parsed = new Date(match[0]);
  return Number.isNaN(parsed.valueOf()) ? null : parsed;
}

function formatCountdown(value: string) {
  const parsed = extractDate(value);
  if (!parsed) return null;

  const now = new Date();
  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const startOfDeadline = new Date(parsed.getFullYear(), parsed.getMonth(), parsed.getDate());
  const daysLeft = Math.max(0, Math.ceil((startOfDeadline.getTime() - startOfToday.getTime()) / 86_400_000));

  return `${daysLeft} day${daysLeft === 1 ? "" : "s"} left`;
}

function normalizeTimeline(deadlines: string[]) {
  const wanted = [
    { label: "Pre-Bid Meeting", match: /pre[- ]?(bid|proposal)|conference/i },
    { label: "Questions Due", match: /question/i },
    { label: "Proposal Due", match: /proposal|bid\/proposal|closing|due date/i },
    { label: "Bid Opening", match: /opening/i }
  ];

  return wanted.map((item) => ({
    label: item.label,
    value: deadlines.find((deadline) => item.match.test(deadline)) ?? "Not stated"
  }));
}

export function DeadlineTimeline({ deadlines }: { deadlines: string[] }) {
  const timeline = normalizeTimeline(deadlines);

  return (
    <Card className="rounded-[28px] border-border/70 bg-card/90">
      <CardHeader>
        <CardTitle>Important Deadlines</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {timeline.map((item, index) => (
            <div key={item.label} className="flex items-start justify-between gap-5">
              <div className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className="rounded-full bg-primary/10 p-2 text-primary">
                  <CalendarClock className="h-4 w-4" />
                </div>
                {index < timeline.length - 1 && <div className="mt-2 h-full w-px bg-border" />}
              </div>
              <div className="pb-3">
                <p className="text-base font-semibold">{item.label}</p>
                <p className="mt-1 text-sm text-muted-foreground">{item.value}</p>
              </div>
              </div>
              {formatCountdown(item.value) ? (
                <span className="shrink-0 rounded-full border border-primary/30 bg-primary/10 px-3 py-1.5 text-xs font-semibold text-primary">
                  {formatCountdown(item.value)}
                </span>
              ) : null}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
