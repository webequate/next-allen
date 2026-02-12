import { NextResponse } from "next/server";
import { ContactForm } from "@/interfaces/ContactForm";
import { sendContactEmail } from "@/lib/email";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

function validate(formData: ContactForm) {
  const errors: string[] = [];

  if (formData.website) {
    errors.push("Bot submission detected");
  }

  if (!formData.name?.trim()) errors.push("Name is required");
  if (!formData.email?.match(/^[^@\s]+@[^@\s]+\.[^@\s]+$/)) {
    errors.push("Valid email is required");
  }
  if (!formData.subject?.trim()) errors.push("Subject is required");
  if (!formData.message?.trim()) errors.push("Message is required");

  return errors;
}

export async function POST(request: Request) {
  try {
    const formData: ContactForm = await request.json();
    const errors = validate(formData);
    if (errors.length) {
      return NextResponse.json(
        { message: "Validation failed", errors },
        { status: 400 }
      );
    }

    await sendContactEmail(formData);
    return NextResponse.json({ message: "Email sent successfully!" });
  } catch (error: any) {
    const devDetails =
      process.env.NODE_ENV !== "production" ? error?.message : undefined;
    return NextResponse.json(
      { message: "Error sending email.", error: devDetails },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({ ok: true, route: "send-email" });
}
