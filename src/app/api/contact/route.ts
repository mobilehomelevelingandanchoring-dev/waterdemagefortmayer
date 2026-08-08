import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

// ---------------------------------------------------------------------------
// TODO: Connect to an email service (Resend / SendGrid) or CRM
//       (ServiceTitan / HubSpot) to forward leads automatically.
//       Example Resend snippet:
//
//   import { Resend } from "resend";
//   const resend = new Resend(process.env.RESEND_API_KEY);
//   await resend.emails.send({
//     from: "noreply@royalwaterdamagefortmyers.com",
//     to: "info@royalwaterdamagefortmyers.com",
//     subject: `New Lead: ${data.name}`,
//     html: `<pre>${JSON.stringify(data, null, 2)}</pre>`,
//   });
// ---------------------------------------------------------------------------

// Schema — mirrors the client-side LeadForm schema exactly
const contactSchema = z.object({
  name: z.string().min(2, "Name is required"),
  phone: z
    .string()
    .min(10, "Valid phone number required")
    .regex(/[\d\s\-\(\)\+]+/, "Enter a valid phone number"),
  address: z.string().min(3, "Address or ZIP required"),
  issue: z.string().min(10, "Please describe your issue briefly"),
  urgency: z.enum(["emergency", "same-day", "scheduled"]),
});

export async function POST(request: NextRequest) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { success: false, error: "Invalid JSON in request body." },
      { status: 400 }
    );
  }

  const result = contactSchema.safeParse(body);

  if (!result.success) {
    const firstError = result.error.issues[0]?.message ?? "Validation failed.";
    return NextResponse.json(
      { success: false, error: firstError },
      { status: 422 }
    );
  }

  const data = result.data;

  // Log submission in development only
  if (process.env.NODE_ENV === "development") {
    console.log("[/api/contact] New lead submission:", {
      name: data.name,
      phone: data.phone,
      address: data.address,
      urgency: data.urgency,
      issue: data.issue,
      receivedAt: new Date().toISOString(),
    });
  }

  // TODO: Add CRM / email integration here before going live.
  //       Current stub returns success immediately without persisting data.

  return NextResponse.json(
    {
      success: true,
      message:
        "Your request has been received. Our team will call you within minutes.",
    },
    { status: 200 }
  );
}

// Reject non-POST methods
export async function GET() {
  return NextResponse.json({ success: false, error: "Method not allowed." }, { status: 405 });
}
