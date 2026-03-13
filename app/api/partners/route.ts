import { NextResponse } from "next/server";

import { fetchPartners } from "@/lib/api";

export async function GET() {
  const data = await fetchPartners();
  return NextResponse.json(data);
}
