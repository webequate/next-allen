// emails/index.ts
import nodemailer from "nodemailer";
import { buildSendMail } from "mailing-core";

const transport = nodemailer.createTransport({
  host: "smtp.sendgrid.net",
  port: 587,
  auth: {
    user: "apikey",
    pass: process.env.SENDGRID_API_KEY,
  },
});

const sendMail = buildSendMail({
  transport,
  defaultFrom: "WebEquate <webequate@gmail.com>",
  configPath: "./mailing.config.json",
});

export default sendMail;
