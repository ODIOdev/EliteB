import { Resend } from "resend";

let _resend: Resend | null = null;

function getResend() {
  if (!_resend && process.env.RESEND_API_KEY) {
    _resend = new Resend(process.env.RESEND_API_KEY);
  }
  return _resend;
}

export async function sendLeadNotification(lead: {
  full_name: string;
  email?: string;
  phone?: string;
  interest?: string;
}) {
  if (!process.env.RESEND_API_KEY) {
    console.log("[Resend] Mock email — new lead:", lead);
    return { success: true, mock: true };
  }

  const resend = getResend();
  if (!resend) return { success: false };

  return resend.emails.send({
    from: "Elite Brokers NY <notifications@elitebrokersny.com>",
    to: process.env.ADMIN_EMAIL || "Jfebry@therealtor.team",
    subject: `New Lead: ${lead.full_name}`,
    html: `
      <h2>New Lead Received</h2>
      <p><strong>Name:</strong> ${lead.full_name}</p>
      <p><strong>Email:</strong> ${lead.email || "N/A"}</p>
      <p><strong>Phone:</strong> ${lead.phone || "N/A"}</p>
      <p><strong>Interest:</strong> ${lead.interest || "General inquiry"}</p>
    `,
  });
}

export async function sendAppointmentConfirmation(appointment: {
  full_name: string;
  client_email: string;
  appointment_type: string;
  scheduled_at: string;
}) {
  if (!process.env.RESEND_API_KEY) {
    console.log("[Resend] Mock email — appointment:", appointment);
    return { success: true, mock: true };
  }

  const resend = getResend();
  if (!resend) return { success: false };

  return resend.emails.send({
    from: "Elite Brokers NY <bookings@elitebrokersny.com>",
    to: appointment.client_email,
    subject: `Appointment Confirmed — ${appointment.appointment_type}`,
    html: `
      <h2>Your appointment is confirmed</h2>
      <p>Hi ${appointment.full_name},</p>
      <p>Your ${appointment.appointment_type} appointment has been scheduled for ${new Date(appointment.scheduled_at).toLocaleString()}.</p>
      <p>We look forward to meeting you!</p>
      <p>— Elite Brokers NY</p>
    `,
  });
}

export async function sendEmail(params: { to: string; subject: string; html?: string }) {
  if (!process.env.RESEND_API_KEY) {
    console.log("[Resend] Mock email:", params);
    return { success: true, mock: true };
  }

  const resend = getResend();
  if (!resend) return { success: false };

  return resend.emails.send({
    from: "Elite Brokers NY <notifications@elitebrokersny.com>",
    to: params.to,
    subject: params.subject,
    html: params.html || `<p>${params.subject}</p>`,
  });
}
