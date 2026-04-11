import { z } from "zod";

export const createSousClasseSchema = z.object({
  code: z.string().trim().min(1, "Le code est obligatoire"),
  libelle: z.string().trim().optional(),
  niveau: z.number().int().positive("Le niveau doit être un entier positif").optional(),
  classeId: z.number().int().positive("classeId invalide"),
});

export const updateSousClasseSchema = z.object({
  code: z.string().trim().min(1, "Le code est obligatoire").optional(),
  libelle: z.string().trim().optional(),
  niveau: z.number().int().positive("Le niveau doit être un entier positif").optional(),
  classeId: z.number().int().positive("classeId invalide").optional(),
});
