"use client";

import Link from "next/link";
import { useActionState } from "react";

import { signup, type AuthFormState } from "@/app/(auth)/signup/actions";
import { PasswordField } from "@/components/auth/PasswordField";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const initialState: AuthFormState = {};

export function SignupForm({
  message,
  error
}: {
  message?: string;
  error?: string;
}) {
  const [state, formAction, pending] = useActionState(signup, initialState);
  const resolvedMessage = state.message ?? message;
  const resolvedError = state.error ?? error;

  return (
    <>
      <form action={formAction} className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="first_name">
              First name
            </label>
            <Input id="first_name" name="first_name" autoComplete="given-name" required />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="last_name">
              Last name
            </label>
            <Input id="last_name" name="last_name" autoComplete="family-name" required />
          </div>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium" htmlFor="company_name">
            Company name
          </label>
          <Input id="company_name" name="company_name" autoComplete="organization" required />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium" htmlFor="email">
            Email
          </label>
          <Input id="email" name="email" type="email" autoComplete="email" required />
        </div>
        <PasswordField id="password" name="password" label="Password" autoComplete="new-password" />
        <PasswordField
          id="password_confirmation"
          name="password_confirmation"
          label="Confirm password"
          autoComplete="new-password"
        />
        {resolvedMessage ? <p className="text-sm text-emerald-500">{resolvedMessage}</p> : null}
        {resolvedError ? <p className="text-sm text-rose-500">{resolvedError}</p> : null}
        <Button type="submit" className="w-full" disabled={pending}>
          {pending ? "Creating account..." : "Create account"}
        </Button>
      </form>
      <p className="mt-4 text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link href="/login" className="text-primary hover:underline">
          Log in
        </Link>
      </p>
    </>
  );
}
