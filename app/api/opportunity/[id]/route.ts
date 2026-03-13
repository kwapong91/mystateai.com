import { NextResponse } from "next/server";

import { fetchOpportunity } from "@/lib/api";

export async function GET(_: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
  const data = await fetchOpportunity(id);
  if (!data) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json(data);
}
