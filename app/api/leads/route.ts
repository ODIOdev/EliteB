import { NextRequest, NextResponse } from "next/server";
import { sendLeadNotification } from "@/lib/resend";

export async function GET() {
  const { MOCK_LEADS } = await import("@/lib/mock-data");
  return NextResponse.json({ leads: MOCK_LEADS });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, full_name, email, phone, message, interest, property_interest, source } = body;

    const leadName = full_name || name;
    const leadInterest = interest || property_interest || message;

    if (!leadName) {
      return NextResponse.json({ error: "Full name is required" }, { status: 400 });
    }

    const lead = {
      full_name: leadName,
      email,
      phone,
      interest: leadInterest,
      source: source || "Website",
      status: "new",
    };

    // TODO: Insert into Supabase
    // const supabase = createServerSupabaseClient();
    // const { data, error } = await supabase.from("leads").insert(lead).select().single();

    await sendLeadNotification({
      full_name: leadName,
      email,
      phone,
      interest: leadInterest,
    });

    return NextResponse.json({ success: true, lead }, { status: 201 });
  } catch (error) {
    console.error("Lead creation error:", error);
    return NextResponse.json({ error: "Failed to create lead" }, { status: 400 });
  }
}
