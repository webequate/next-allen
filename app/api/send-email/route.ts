import { NextRequest, NextResponse } from "next/server";
import { ContactForm } from "@/interfaces/ContactForm";
import { sendContactEmail } from "@/lib/email";

export async function POST(request: NextRequest) {
  if (request.method !== "POST") {
    return NextResponse.json(
      { message: "Method not allowed." },
      { status: 405 }
    );
  }

  try {
    const formData: ContactForm = await request.json();

    // Honeypot check - if the website field is filled, it's likely a bot
    if (formData.website) {
      return NextResponse.json(
        { message: "Invalid submission." },
        { status: 400 }
      );
    }

    await sendContactEmail(formData);
    return NextResponse.json(
      { message: "Email sent successfully!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { message: "Error sending email." },
      { status: 500 }
    );
  }
}
