import nodemailer from "nodemailer";
import { ContactForm } from "@/interfaces/ContactForm";

// Create a transporter using Gmail SMTP
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASS,
  },
});

export async function sendContactEmail(formData: ContactForm): Promise<void> {
  const htmlContent = `
    <html>
      <head>
        <style>
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif;
            line-height: 1.6;
            color: #333;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f9f9f9;
            border: 1px solid #ddd;
            border-radius: 5px;
          }
          .header {
            background-color: #007bff;
            color: white;
            padding: 20px;
            border-radius: 5px 5px 0 0;
            text-align: center;
          }
          .content {
            background-color: white;
            padding: 20px;
          }
          .field {
            margin-bottom: 15px;
          }
          .field-label {
            font-weight: bold;
            color: #007bff;
            margin-bottom: 5px;
          }
          .field-value {
            color: #555;
            word-break: break-word;
          }
          .footer {
            background-color: #f0f0f0;
            padding: 10px;
            text-align: center;
            font-size: 12px;
            color: #666;
            border-radius: 0 0 5px 5px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <a href="https://webequate.com" style="text-decoration: none; display: inline-block;">
              <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQAAAAAtCAYAAABBN7U6AAAACXBIWXMAAAsTAAALEwEAmpwYAAABlUlEQVR4nO3cvVHDMAAG0JjLAjR01AzANizCDCzCNgxATccSpudycRzZ1s/3Xp2TZNn3RZZkTfM8n9hF6x071W4A9T3UbgBQjwCAYAIAggkACCYAIJgAgGDn2g1I9PH5XbsJp/e3l9pNoAECoJKvn6faTQCvAJDsfFresfZ/x9hev99759zR9fSilX5f6rfU52jXeowAIJgAgGACAIIJAAgmACBYT/sAjppdL52Nvsnr8+8WxRR4vPWHh/THgba6nq1WLUoVlTPNyyeCtLIMuFWHjbIcVaq15bne6lnSWjkXeQWAYAIAggkACCYAIFhPqwClk2pbTbrQt9Hub9H19BQAw3AeAK0QANtZtRzjPABaYA4AggmA7cyn8d4vGZwAgGA9zQEM9S0A1Yx2f20FBu7T0wiANvT2D8kVRgAQzAigko7OA2BgzgNYX0/6eQBrr8t5AG2Uc9EtI4C1N3yvB9+3AHUc1R/6/T5F/WYOAIIJAAgmACCYAIBgAgCCTcurgHDVUcu37MAIAIIJAAgmACCYAIBgfzNZV3xDXZ+LAAAAAElFTkSuQmCC" alt="WebEquate" style="height: 60px; width: auto; margin-bottom: 10px;" />
            </a>
            <h1>New Contact Form Submission</h1>
          </div>
          <div class="content">
            <div class="field">
              <div class="field-label">Name</div>
              <div class="field-value">${escapeHtml(formData.name)}</div>
            </div>
            <div class="field">
              <div class="field-label">Email</div>
              <div class="field-value">${escapeHtml(formData.email)}</div>
            </div>
            <div class="field">
              <div class="field-label">Subject</div>
              <div class="field-value">${escapeHtml(formData.subject)}</div>
            </div>
            <div class="field">
              <div class="field-label">Message</div>
              <div class="field-value">${escapeHtml(formData.message).replace(/\n/g, "<br>")}</div>
            </div>
          </div>
          <div class="footer">
            <p>This is an automated email from your contact form.</p>
          </div>
        </div>
      </body>
    </html>
  `;

  const textContent = `
Name: ${formData.name}
Email: ${formData.email}
Subject: ${formData.subject}
Message: ${formData.message}
  `.trim();

  await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to: process.env.EMAIL_TO,
    cc: process.env.EMAIL_CC,
    subject: `Contact Form: ${formData.subject}`,
    text: textContent,
    html: htmlContent,
  });
}

function escapeHtml(text: string): string {
  const map: { [key: string]: string } = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  };
  return text.replace(/[&<>"']/g, (m) => map[m]);
}
