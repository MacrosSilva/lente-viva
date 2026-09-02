"use server";

import { contactFormSchema, type ContactFormValues } from "@/lib/contact-schema";

export async function submitContactMessage(values: ContactFormValues) {
  const data = contactFormSchema.parse(values);
  // No persistence layer is wired up yet -- connect a database or an email
  // provider (e.g. Resend) here when the site is ready to receive real leads.
  console.log("[contato] nova mensagem", {
    name: data.name,
    email: data.email,
    projectType: data.projectType,
  });
  return { ok: true as const };
}
