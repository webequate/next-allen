// pages/api/send-email.tsx
import type { NextApiRequest, NextApiResponse } from "next";
import sendMail from "@/emails";
import { ContactForm } from "@/interfaces/ContactForm";
import Contact from "@/emails/Contact";
import formidable from "formidable";
import fs from "fs";
import path from "path";

async function sendEmail(formData: ContactForm, file: formidable.File) {
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
    attachments: [
      {
        filename: file.name,
        content: fs.readFileSync(file.path).toString("base64"),
        type: file.type,
        disposition: "attachment",
      },
    ],
  });
}

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const form = new formidable.IncomingForm();
    form.parse(req, async (err, fields, files) => {
      if (err) {
        return res.status(400).json({ error: "Error parsing the request" });
      }
      const formData: ContactForm = fields;
      const file = Object.values(files)[0];
      if (file) {
        await sendEmail(formData, file);
        res.status(200).json({ message: "Email sent successfully!" });
      } else {
        res.status(400).json({ message: "No file uploaded." });
      }
    });
  } else {
    res.status(405).json({ message: "Method not allowed." });
  }
}
