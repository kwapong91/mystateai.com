import Link from "next/link";
import { redirect } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getCurrentUserProfile, isOnboardingComplete } from "@/lib/supabase/profile";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const { user, profile } = await getCurrentUserProfile();

  if (user) {
    redirect(isOnboardingComplete(profile) ? "/dashboard" : "/setup");
  }

  return (
    <main className="mx-auto flex min-h-screen max-w-5xl items-center px-4 py-10">
      <Card className="w-full">
        <CardContent className="flex flex-col gap-8 p-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-4">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">mystateai</p>
            <div className="space-y-3">
              <h1 className="text-4xl font-semibold tracking-tight">Welcome to mystateai</h1>
              <p className="max-w-2xl text-lg text-muted-foreground">
                AI assistant for government contractors
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link href="/login">
              <Button variant="outline">Log in</Button>
            </Link>
            <Link href="/signup">
              <Button>Sign up</Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
