// interfaces/ContactForm.ts
export interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
  website?: string; // honeypot field
}
