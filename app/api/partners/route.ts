import { NextResponse } from "next/server";

import { fetchPartners } from "@/lib/api";
import { createClient } from "@/lib/supabase/server-client";

export async function GET() {
  const supabase = await createClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const data = await fetchPartners();
  return NextResponse.json(data);
}
