import { NextResponse } from "next/server";

/**
 * MLS/IDX API Placeholder
 * Replace with your MLS provider integration (e.g., RETS, RESO Web API, Bridge Interactive)
 */
export async function GET() {
  return NextResponse.json({
    status: "placeholder",
    message: "MLS/IDX integration not configured",
    instructions: [
      "Set MLS_API_KEY and MLS_API_URL in environment variables",
      "Implement provider-specific authentication",
      "Map MLS fields to your listings schema",
      "Set up sync cron job via Vercel Cron or Supabase Edge Functions",
    ],
    mockListings: [],
  });
}

export async function POST() {
  return NextResponse.json({
    status: "placeholder",
    message: "MLS sync endpoint — configure MLS_API_KEY to enable",
  });
}
