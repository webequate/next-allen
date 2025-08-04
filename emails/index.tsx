// emails/index.ts
import nodemailer from "nodemailer";
import { buildSendMail } from "mailing-core";

const transport = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASS,
  },
});

const sendMail = buildSendMail({
  transport,
  defaultFrom: "WebEquate <webequate@gmail.com>",
  configPath: "./mailing.config.json",
});

export default sendMail;
