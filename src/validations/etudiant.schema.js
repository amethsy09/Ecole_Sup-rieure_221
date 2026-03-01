import { z } from "zod";

export const createEtudiantSchema = z
  .object({
  prenom: z.string().trim().min(2, "Prenom min 2 caractères"),
  nom: z.string().trim().min(2, "Nom min 2 caractères"),
  email: z.string().trim().email("Email invalide"),
  dateNaissance: z.coerce.date(),
  classeId: z.number().int().positive("classeId invalide"),
  })
  .refine((d) => d.dateNaissance <= new Date(), {
    message: "dateNaissance ne peut pas être dans le futur",
    path: ["dateNaissance"],
  });
