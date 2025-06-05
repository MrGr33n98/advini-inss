import { z } from 'zod';

export const miniFormSchema = z.object({
  name: z.string().min(3, "Digite seu nome completo"),
  phone: z.string().min(10, "Digite seu WhatsApp")
});

export type MiniFormData = z.infer<typeof miniFormSchema>;

export const diagnosisFormSchema = z.object({
  name: z.string().min(3, "Nome deve ter pelo menos 3 caracteres"),
  phone: z.string().min(10, "Formato de telefone inválido"),
  cpf: z.string().optional(),
  benefitType: z.enum(['APOSENTADORIA', 'PENSAO', 'OUTRO'], {
    errorMap: () => ({ message: "Selecione o tipo de benefício" })
  }),
  problemType: z.enum(['EMPRESTIMO', 'DESCONTO', 'NAO_SEI', 'OUTRO'], {
    errorMap: () => ({ message: "Selecione o tipo de problema" })
  }),
  consent: z.literal(true, {
    errorMap: () => ({ message: "Você precisa concordar com os termos" })
  })
});

export type DiagnosisFormData = z.infer<typeof diagnosisFormSchema>;

export const blogPostSchema = z.object({
  title: z.string(),
  date: z.string(),
  summary: z.string(),
  image: z.string(),
  slug: z.string()
});

export type BlogPost = z.infer<typeof blogPostSchema>;