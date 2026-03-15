import { NextResponse } from "next/server";

import { fetchOpportunities } from "@/lib/api";
import { createClient } from "@/lib/supabase/server-client";

export async function GET() {
  const supabase = await createClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const data = await fetchOpportunities();
  return NextResponse.json(data);
}
