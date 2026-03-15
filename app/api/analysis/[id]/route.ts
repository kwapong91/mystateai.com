import { NextResponse } from "next/server";

import { fetchAnalysis } from "@/lib/api";
import { createClient } from "@/lib/supabase/server-client";

export async function GET(_: Request, context: { params: Promise<{ id: string }> }) {
  const supabase = await createClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await context.params;
  const data = await fetchAnalysis(id);
  if (!data) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json(data);
}
