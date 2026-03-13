import { NextResponse } from "next/server";

import { fetchOpportunities } from "@/lib/api";

export async function GET() {
  const data = await fetchOpportunities();
  return NextResponse.json(data);
}
