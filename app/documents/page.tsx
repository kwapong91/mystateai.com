import { UploadCloud } from "lucide-react";

import { AppShell } from "@/components/AppShell";
import { PageHeader } from "@/components/PageHeader";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { fetchDocuments } from "@/lib/api";

export default async function DocumentsPage() {
  const documents = await fetchDocuments();
  const groups = ["Proposal Documents", "Attachments", "Analysis Files"] as const;

  return (
    <AppShell>
      <div className="space-y-8">
        <PageHeader
          eyebrow="Files"
          title="Documents"
          description="Manage proposal drafts, attachments, and generated analysis artifacts in one workspace."
          actions={
            <Button>
              <UploadCloud className="mr-2 h-4 w-4" />
              Upload document
            </Button>
          }
        />

        <div className="grid gap-5 xl:grid-cols-3">
          {groups.map((group) => (
            <Card key={group}>
              <CardHeader>
                <CardTitle>{group}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {documents
                  .filter((item) => item.group === group)
                  .map((item) => (
                    <div key={item.id} className="rounded-2xl border border-border/70 bg-background p-4">
                      <div className="flex items-center justify-between gap-3">
                        <div>
                          <p className="text-sm font-medium">{item.name}</p>
                          <p className="mt-1 text-xs text-muted-foreground">
                            {item.fileType} • Opportunity {item.opportunityId}
                          </p>
                        </div>
                        <Badge>{item.status}</Badge>
                      </div>
                    </div>
                  ))}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
