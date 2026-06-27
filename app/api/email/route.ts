import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { to, subject, html } = body;

    if (!to || !subject) {
      return NextResponse.json({ error: "Recipient and subject required" }, { status: 400 });
    }

    const { sendEmail } = await import("@/lib/resend");

    const result = await sendEmail({ to, subject, html });

    return NextResponse.json({ success: true, result });
  } catch (error) {
    console.error("Email send error:", error);
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }
}
