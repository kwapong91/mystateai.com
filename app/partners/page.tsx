import { MessageSquare, Plus, Search, Users2 } from "lucide-react";

import { AppShell } from "@/components/AppShell";
import { PageHeader } from "@/components/PageHeader";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { fetchPartners } from "@/lib/api";

export default async function PartnersPage() {
  const partners = await fetchPartners();

  return (
    <AppShell>
      <div className="space-y-8">
        <PageHeader
          eyebrow="Network"
          title="Partners"
          description="Find subcontractors and teaming partners by certification, capability, geography, and NAICS alignment."
        />

        <div className="grid gap-3 lg:grid-cols-4">
          {["NAICS code", "Certification", "Location", "Industry"].map((item) => (
            <select key={item} className="h-10 rounded-xl border bg-background px-3 text-sm">
              <option>{item}</option>
            </select>
          ))}
        </div>

        <div className="grid gap-5 xl:grid-cols-2">
          {partners.map((partner) => (
            <Card key={partner.id}>
              <CardHeader className="flex flex-row items-start justify-between gap-4">
                <div>
                  <CardTitle>{partner.companyName}</CardTitle>
                  <p className="mt-1 text-sm text-muted-foreground">{partner.location}</p>
                </div>
                <div className="rounded-2xl bg-primary/10 p-3 text-primary">
                  <Users2 className="h-5 w-5" />
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="mb-2 text-sm font-medium">Certifications</p>
                  <div className="flex flex-wrap gap-2">
                    {partner.certifications.map((item) => (
                      <Badge key={item}>{item}</Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="mb-2 text-sm font-medium">Capabilities</p>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    {partner.capabilities.map((item) => (
                      <li key={item}>• {item}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="mb-2 text-sm font-medium">NAICS Codes</p>
                  <div className="flex flex-wrap gap-2">
                    {partner.naicsCodes.map((code) => (
                      <Badge key={code} className="bg-secondary/80">
                        {code}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Button variant="outline" size="sm">
                    <Search className="mr-2 h-4 w-4" />
                    View Profile
                  </Button>
                  <Button variant="outline" size="sm">
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Message
                  </Button>
                  <Button size="sm">
                    <Plus className="mr-2 h-4 w-4" />
                    Invite to Team
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
