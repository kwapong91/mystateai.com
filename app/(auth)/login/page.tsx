import { redirect } from "next/navigation";

import { LoginForm } from "@/components/auth/LoginForm";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getCurrentUserProfile, isOnboardingComplete } from "@/lib/supabase/profile";

export default async function LoginPage({
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
    <div className="mx-auto flex min-h-screen max-w-md items-center px-4 py-10">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Log in</CardTitle>
          <CardDescription>Access your mystateai workspace.</CardDescription>
        </CardHeader>
        <CardContent>
          <LoginForm error={error} message={message} />
        </CardContent>
      </Card>
    </div>
  );
}
