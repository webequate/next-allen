import nodemailer from "nodemailer";
import { ContactForm } from "@/interfaces/ContactForm";

export function escapeHtml(text: string): string {
  const map: { [key: string]: string } = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  };
  return text.replace(/[&<>"']/g, (char) => map[char]);
}

export function buildReplyMailto(formData: ContactForm): string {
  const quotedMessage = formData.message
    .split("\n")
    .map((line) => "> " + line)
    .join("\n");

  const subject = `Re: ${formData.subject}`;
  const body = `\n\n${quotedMessage}`;

  return `mailto:${encodeURIComponent(
    formData.email
  )}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export function buildHtmlEmail(formData: ContactForm): string {
  const name = escapeHtml(formData.name);
  const email = escapeHtml(formData.email);
  const subject = escapeHtml(formData.subject || "New contact form submission");
  const message = escapeHtml(formData.message).replace(/\n/g, "<br />");
  const logoUrl =
    "https://allenhaydenjohnson.com/assets/logo-webequate-light.png";
  const replyMailto = buildReplyMailto(formData);

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${subject}</title>
  </head>
  <body style="margin:0; padding:24px; font-family: Arial, Helvetica, sans-serif; background:#0b1020; color:#e2e8f0;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:680px; margin:0 auto; background:#0f172a; border-radius:16px; overflow:hidden; border:1px solid #1f2937;">
      <tr>
        <td style="padding:20px 24px; background:#0b1224; border-bottom:1px solid #1f2937; text-align:center;">
          <a href="https://webequate.com" target="_blank" rel="noopener" style="display:inline-block; text-decoration:none;">
            <img src="${logoUrl}" alt="" role="presentation" width="160" height="40" style="display:block; width:160px; height:auto; border:0; outline:none; text-decoration:none;" />
          </a>
        </td>
      </tr>
      <tr>
        <td style="padding:24px; color:#cbd5f5; font-size:14px;">
          <h1 style="margin:0 0 12px 0; font-size:20px; line-height:1.3; color:#f8fafc;">Contact Form Submission</h1>
          <p style="margin:0 0 20px 0; color:#94a3b8;">Website: <a href="https://allenhaydenjohnson.com" style="color:#93c5fd; text-decoration:none;">AllenHaydenJohnson.com</a></p>

          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#0b1224; border:1px solid #1f2937; border-radius:12px;">
            <tr>
              <td style="padding:16px 18px;">
                <p style="margin:0 0 6px 0; color:#94a3b8; font-size:12px; text-transform:uppercase; letter-spacing:0.06em;">Name</p>
                <p style="margin:0 0 20px 0; padding-bottom:20px; border-bottom:1px solid #1f2937; color:#e2e8f0; font-size:15px;">${name}</p>
                <p style="margin:0 0 6px 0; color:#94a3b8; font-size:12px; text-transform:uppercase; letter-spacing:0.06em;">Email</p>
                <p style="margin:0 0 20px 0; padding-bottom:20px; border-bottom:1px solid #1f2937; color:#e2e8f0; font-size:15px;"><a href="mailto:${email}" style="color:#93c5fd; text-decoration:none;">${email}</a></p>
                <p style="margin:0 0 6px 0; color:#94a3b8; font-size:12px; text-transform:uppercase; letter-spacing:0.06em;">Subject</p>
                <p style="margin:0 0 20px 0; padding-bottom:20px; border-bottom:1px solid #1f2937; color:#e2e8f0; font-size:15px;">${subject}</p>
                <p style="margin:0 0 6px 0; color:#94a3b8; font-size:12px; text-transform:uppercase; letter-spacing:0.06em;">Message</p>
                <p style="margin:0 0 0px 0; color:#e2e8f0; line-height:1.7; font-size:15px;">${message}</p>
              </td>
            </tr>
          </table>
          <p style="margin:16px 0 0px 0;">
            <a href="${replyMailto}" style="display:inline-block; color:#93c5fd; padding:8px 0; text-decoration:none; font-weight:500;">Reply to ${name}</a>
          </p>
        </td>
      </tr>
      <tr>
        <td style="padding:20px 24px; background:#0b1224; border-top:1px solid #1f2937; text-align:center;">
          <a href="mailto:webequate@gmail.com" style="color:#93c5fd; text-decoration:none;">Reach out to WebEquate</a>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

export function buildPlainText(formData: ContactForm, receivedAt: string): string {
  const lines = [
    "Website Contact Submission",
    "================================",
    "",
    "Website: https://allenhaydenjohnson.com",
    `Name: ${formData.name}`,
    `Email: ${formData.email}`,
    `Subject: ${formData.subject}`,
    `Received: ${receivedAt}`,
    "",
    "Message:",
    "--------",
    formData.message.trim(),
    "",
    "================================",
    "This email was generated automatically from the contact form.",
    "Delivered by WebEquate",
  ];
  return lines.join("\n");
}

export async function sendContactEmail(formData: ContactForm): Promise<void> {
  if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASS) {
    throw new Error(
      "Email transport credentials missing (GMAIL_USER/GMAIL_APP_PASS)"
    );
  }
  if (!process.env.EMAIL_FROM || !process.env.EMAIL_TO) {
    throw new Error("EMAIL_FROM and EMAIL_TO must be set");
  }

  const receivedAt = new Date().toISOString();
  const html = buildHtmlEmail(formData);
  const text = buildPlainText(formData, receivedAt);

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASS,
    },
  });

  await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to: process.env.EMAIL_TO,
    cc: process.env.EMAIL_CC,
    subject: `Website Inquiry: ${formData.subject}`,
    html,
    text,
  });
}
