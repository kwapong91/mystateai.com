import { redirect } from "next/navigation";

import { SignupForm } from "@/components/auth/SignupForm";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getCurrentUserProfile, isOnboardingComplete } from "@/lib/supabase/profile";

export default async function SignupPage({
  searchParams
}: {
  searchParams: Promise<{ error?: string; message?: string }>;
}) {
  const { error, message } = await searchParams;
  const { user, profile } = await getCurrentUserProfile();

  if (user) {
    redirect(isOnboardingComplete(profile) ? "/dashboard" : "/setup");
  }

  return (
    <div className="mx-auto flex min-h-screen max-w-lg items-center px-4 py-10">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Create account</CardTitle>
          <CardDescription>Start using mystateai with your own workspace.</CardDescription>
        </CardHeader>
        <CardContent>
          <SignupForm error={error} message={message} />
          <p className="mt-3 text-xs text-muted-foreground">
            By creating an account, you&apos;ll get your own contractor workspace.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
