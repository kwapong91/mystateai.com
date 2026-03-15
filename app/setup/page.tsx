import { redirect } from "next/navigation";

import { SetupForm } from "@/components/auth/SetupForm";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getCurrentUserProfile, isOnboardingComplete } from "@/lib/supabase/profile";

export const dynamic = "force-dynamic";

export default async function SetupPage() {
  const { user, profile } = await getCurrentUserProfile();

  if (!user) {
    redirect("/login");
  }

  if (isOnboardingComplete(profile)) {
    redirect("/dashboard");
  }

  return (
    <div className="mx-auto flex min-h-screen max-w-3xl items-center px-4 py-10">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Complete your workspace setup</CardTitle>
          <CardDescription>
            This is required before mystateai can personalize opportunity fit, scoring, and guidance.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <SetupForm
            defaults={{
              firstName: profile?.first_name ?? user.user_metadata.first_name ?? "",
              lastName: profile?.last_name ?? user.user_metadata.last_name ?? "",
              companyName: profile?.company_name ?? user.user_metadata.company_name ?? "",
              title: profile?.title ?? "",
              businessDescription: profile?.business_description ?? "",
              naicsCodes: (profile?.naics_codes ?? []).join(", "),
              certifications: (profile?.certifications ?? []).join(", "),
              capabilities: (profile?.capabilities ?? []).join(", "),
              stateFocus: profile?.state_focus ?? ""
            }}
          />
        </CardContent>
      </Card>
    </div>
  );
}
