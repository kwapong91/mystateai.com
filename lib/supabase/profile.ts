import { createClient } from "@/lib/supabase/server-client";

export type UserProfile = {
  id: string;
  email: string;
  first_name: string | null;
  last_name: string | null;
  company_name: string | null;
  title: string | null;
  business_description: string | null;
  naics_codes: string[] | null;
  certifications: string[] | null;
  capabilities: string[] | null;
  state_focus: string | null;
  onboarding_completed: boolean | null;
};

export async function getCurrentUserProfile() {
  const supabase = await createClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    return { user: null, profile: null };
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select(
      "id, email, first_name, last_name, company_name, title, business_description, naics_codes, certifications, capabilities, state_focus, onboarding_completed"
    )
    .eq("id", user.id)
    .maybeSingle<UserProfile>();

  return { user, profile: profile ?? null };
}

export function isOnboardingComplete(profile: Pick<UserProfile, "onboarding_completed"> | null) {
  return Boolean(profile?.onboarding_completed);
}
