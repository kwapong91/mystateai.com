import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

import { getSupabaseAnonKey, getSupabaseUrl } from "@/lib/supabase/config";

const PROTECTED_PREFIXES = [
  "/dashboard",
  "/opportunities",
  "/saved-opportunities",
  "/documents",
  "/settings",
  "/analysis",
  "/partners",
  "/setup"
];

function isProtectedRoute(pathname: string) {
  return PROTECTED_PREFIXES.some((route) => pathname === route || pathname.startsWith(`${route}/`));
}

function withCookies(target: NextResponse, source: NextResponse) {
  source.cookies.getAll().forEach((cookie) => {
    target.cookies.set(cookie);
  });

  return target;
}

export async function updateSession(request: NextRequest) {
  let response = NextResponse.next({
    request
  });

  const supabase = createServerClient(getSupabaseUrl(), getSupabaseAnonKey(), {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
        response = NextResponse.next({ request });
        cookiesToSet.forEach(({ name, value, options }) => response.cookies.set(name, value, options));
      }
    }
  });

  const {
    data: { user }
  } = await supabase.auth.getUser();
  let onboardingCompleted = false;

  if (user) {
    try {
      const { data: profile } = await supabase
        .from("profiles")
        .select("onboarding_completed")
        .eq("id", user.id)
        .maybeSingle();

      onboardingCompleted = Boolean(profile?.onboarding_completed);
    } catch {
      onboardingCompleted = false;
    }

    if (!onboardingCompleted && request.nextUrl.pathname !== "/setup") {
      return withCookies(NextResponse.redirect(new URL("/setup", request.url)), response);
    }

    if (onboardingCompleted && request.nextUrl.pathname === "/setup") {
      return withCookies(NextResponse.redirect(new URL("/dashboard", request.url)), response);
    }
  }

  if (!user && isProtectedRoute(request.nextUrl.pathname)) {
    return withCookies(NextResponse.redirect(new URL("/login", request.url)), response);
  }

  if (user && (request.nextUrl.pathname === "/login" || request.nextUrl.pathname === "/signup")) {
    return withCookies(NextResponse.redirect(new URL(onboardingCompleted ? "/dashboard" : "/setup", request.url)), response);
  }

  return response;
}
