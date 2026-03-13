import { CheckCircle2 } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function RequirementList({
  title,
  items
}: {
  title: string;
  items: string[];
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-3">
          {items.length === 0 ? (
            <li className="text-sm text-muted-foreground">No requirements surfaced yet.</li>
          ) : (
            items.map((item) => (
              <li key={item} className="flex gap-3 text-sm text-muted-foreground">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <span>{item}</span>
              </li>
            ))
          )}
        </ul>
      </CardContent>
    </Card>
  );
}
