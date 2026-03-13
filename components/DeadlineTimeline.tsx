import { CalendarClock } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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
    <Card>
      <CardHeader>
        <CardTitle>Important Deadlines</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-5">
          {timeline.map((item, index) => (
            <div key={item.label} className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className="rounded-full bg-primary/10 p-2 text-primary">
                  <CalendarClock className="h-4 w-4" />
                </div>
                {index < timeline.length - 1 && <div className="mt-2 h-full w-px bg-border" />}
              </div>
              <div className="pb-3">
                <p className="text-sm font-medium">{item.label}</p>
                <p className="mt-1 text-sm text-muted-foreground">{item.value}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
