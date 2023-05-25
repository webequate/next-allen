// pages/api/send-email.tsx
import type { NextApiRequest, NextApiResponse } from "next";
import sendMail from "@/emails";
import { ContactForm } from "@/interfaces/ContactForm";
import Contact from "@/emails/Contact";

async function sendEmail(formData: ContactForm) {
  await sendMail({
    from: process.env.EMAIL_FROM,
    to: process.env.EMAIL_TO,
    cc: process.env.EMAIL_CC,
    subject: formData.subject,
    component: (
      <Contact
        name={formData.name}
        email={formData.email}
        subject={formData.subject}
        message={formData.message}
      />
    ),
    text: `
      Name: ${formData.name}
      Email: ${formData.email}
      Subject: ${formData.subject}
      Message: ${formData.message}
    `,
  });
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const formData: ContactForm = req.body;
      await sendEmail(formData);
      res.status(200).json({ message: "Email sent successfully!" });
    } catch (error) {
      res.status(500).json({ message: "Error sending email." });
    }
  } else {
    res.status(405).json({ message: "Method not allowed." });
  }
}
