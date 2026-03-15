"use server";

import { redirect } from "next/navigation";
import { headers } from "next/headers";

import { createClient } from "@/lib/supabase/server-client";

function getString(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

export type AuthFormState = {
  error?: string;
  message?: string;
};

async function getEmailRedirectTo() {
  const headerStore = await headers();
  const host = headerStore.get("x-forwarded-host") ?? headerStore.get("host");
  const protocol = headerStore.get("x-forwarded-proto") ?? (host?.includes("localhost") ? "http" : "https");

  if (!host) {
    return undefined;
  }

  return `${protocol}://${host}/auth/confirm?next=/dashboard`;
}

export async function signup(_: AuthFormState, formData: FormData): Promise<AuthFormState> {
  const firstName = getString(formData, "first_name");
  const lastName = getString(formData, "last_name");
  const companyName = getString(formData, "company_name");
  const email = getString(formData, "email");
  const password = getString(formData, "password");
  const passwordConfirmation = getString(formData, "password_confirmation");

  if (!firstName || !lastName || !companyName || !email || !password || !passwordConfirmation) {
    return { error: "Please complete all required fields." };
  }

  if (password !== passwordConfirmation) {
    return { error: "Passwords do not match." };
  }

  if (password.length < 8) {
    return { error: "Password must be at least 8 characters long." };
  }

  const supabase = await createClient();
  const emailRedirectTo = await getEmailRedirectTo();

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo,
      data: {
        first_name: firstName,
        last_name: lastName,
        company_name: companyName
      }
    }
  });

  if (error) {
    return { error: error.message };
  }

  if (!data.session) {
    return {
      message: "Account created. Check your email to confirm your account before logging in."
    };
  }

  redirect("/dashboard");
}
