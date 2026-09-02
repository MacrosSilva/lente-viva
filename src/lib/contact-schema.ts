import { z } from "zod";

export const contactFormSchema = z.object({
  name: z.string().trim().min(2, "Digite seu nome completo."),
  email: z.string().trim().email("Digite um email válido."),
  phone: z.string().trim().optional(),
  projectType: z.string().trim().min(1, "Selecione o tipo de projeto."),
  message: z.string().trim().min(10, "Conte um pouco mais sobre o projeto."),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;
