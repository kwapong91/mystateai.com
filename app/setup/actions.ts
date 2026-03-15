"use server";

import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server-client";

export type SetupFormState = {
  error?: string;
};

function getString(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

function getList(formData: FormData, key: string) {
  return getString(formData, key)
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

export async function completeSetup(_: SetupFormState, formData: FormData): Promise<SetupFormState> {
  const supabase = await createClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const title = getString(formData, "title");
  const businessDescription = getString(formData, "business_description");
  const stateFocus = getString(formData, "state_focus");
  const naicsCodes = getList(formData, "naics_codes");
  const certifications = getList(formData, "certifications");
  const capabilities = getList(formData, "capabilities");

  if (!title || !businessDescription || !stateFocus || naicsCodes.length === 0 || capabilities.length === 0) {
    return { error: "Complete all required onboarding fields before continuing." };
  }

  const { error } = await supabase
    .from("profiles")
    .update({
      title,
      business_description: businessDescription,
      state_focus: stateFocus,
      naics_codes: naicsCodes,
      certifications,
      capabilities,
      onboarding_completed: true
    })
    .eq("id", user.id);

  if (error) {
    return { error: error.message };
  }

  redirect("/dashboard");
}
