import Link from "next/link";
import { SearchX } from "lucide-react";

import { AppShell } from "@/components/AppShell";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function NotFound() {
  return (
    <AppShell>
      <div className="flex min-h-[70vh] items-center justify-center">
        <Card className="max-w-xl">
          <CardContent className="flex flex-col items-center gap-4 p-10 text-center">
            <div className="rounded-2xl bg-primary/10 p-3 text-primary">
              <SearchX className="h-5 w-5" />
            </div>
            <h1 className="text-2xl font-semibold">Opportunity not found</h1>
            <p className="text-sm text-muted-foreground">
              The requested record is not available in the current Phase 5 dataset.
            </p>
            <Link href="/opportunities">
              <Button>Back to opportunities</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
