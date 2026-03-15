import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { createClient } = await import("@/lib/supabase/server-client");
  const supabase = await createClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  return NextResponse.json({ ok: true, ...body });
}
