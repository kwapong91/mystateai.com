import { Bell, ShieldCheck, UserCircle2 } from "lucide-react";

import { AppShell } from "@/components/AppShell";
import { PageHeader } from "@/components/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function SettingsPage() {
  return (
    <AppShell>
      <div className="space-y-8">
        <PageHeader
          eyebrow="Preferences"
          title="Settings"
          description="Theme, profile, and workspace controls for the Phase 5 frontend shell."
        />

        <div className="grid gap-5 xl:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <UserCircle2 className="h-4 w-4 text-primary" />
                Profile
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              Ivan Contractor
              <div className="mt-2">Growth + Capture Lead</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-4 w-4 text-primary" />
                Notifications
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              Deadline reminders and new opportunity alerts will surface here.
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-primary" />
                Workspace
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              Theme, integrations, and API-backed preferences can be expanded from this shell.
            </CardContent>
          </Card>
        </div>
      </div>
    </AppShell>
  );
}
