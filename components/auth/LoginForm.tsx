"use client";

import Link from "next/link";
import { useActionState } from "react";

import { login, type AuthFormState } from "@/app/(auth)/login/actions";
import { PasswordField } from "@/components/auth/PasswordField";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const initialState: AuthFormState = {};

export function LoginForm({
  message,
  error
}: {
  message?: string;
  error?: string;
}) {
  const [state, formAction, pending] = useActionState(login, initialState);
  const resolvedMessage = state.message ?? message;
  const resolvedError = state.error ?? error;

  return (
    <>
      <form action={formAction} className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium" htmlFor="email">
            Email
          </label>
          <Input id="email" name="email" type="email" autoComplete="email" required />
        </div>
        <PasswordField id="password" name="password" label="Password" autoComplete="current-password" />
        {resolvedMessage ? <p className="text-sm text-emerald-500">{resolvedMessage}</p> : null}
        {resolvedError ? <p className="text-sm text-rose-500">{resolvedError}</p> : null}
        <Button type="submit" className="w-full" disabled={pending}>
          {pending ? "Logging in..." : "Log in"}
        </Button>
      </form>
      <p className="mt-4 text-sm text-muted-foreground">
        Need an account?{" "}
        <Link href="/signup" className="text-primary hover:underline">
          Sign up
        </Link>
      </p>
    </>
  );
}
