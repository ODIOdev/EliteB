import { NextRequest, NextResponse } from "next/server";
import { sendAppointmentConfirmation } from "@/lib/resend";

export async function GET() {
  const { MOCK_APPOINTMENTS } = await import("@/lib/mock-data");
  return NextResponse.json({ appointments: MOCK_APPOINTMENTS });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      appointment_type,
      type,
      lead_id,
      listing_id,
      scheduled_at,
      client_name,
      client_email,
    } = body;

    if (!scheduled_at) {
      return NextResponse.json({ error: "scheduled_at is required" }, { status: 400 });
    }

    const appointment = {
      lead_id,
      listing_id,
      appointment_type: appointment_type || type || "consultation",
      scheduled_at,
      status: "pending",
    };

    // TODO: Insert into Supabase
    // const supabase = createServerSupabaseClient();
    // const { data, error } = await supabase.from("appointments").insert(appointment).select().single();

    if (client_email && client_name) {
      await sendAppointmentConfirmation({
        full_name: client_name,
        client_email,
        appointment_type: appointment.appointment_type,
        scheduled_at,
      });
    }

    return NextResponse.json({ success: true, appointment }, { status: 201 });
  } catch (error) {
    console.error("Appointment creation error:", error);
    return NextResponse.json({ error: "Failed to create appointment" }, { status: 500 });
  }
}
