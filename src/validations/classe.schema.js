import Joi from "joi";

// Format attendu : YYYY-YYYY (ex: 2025-2026)
const anneeScolaireRegex = /^\d{4}-\d{4}$/;

export const createClasseSchema = Joi.object({
  code: Joi.string().min(1).required().messages({
    "string.empty": "Le code est obligatoire.",
    "any.required": "Le code est obligatoire.",
  }),
  libelle: Joi.string().min(2).required().messages({
    "string.empty": "Le libellé est obligatoire.",
    "string.min": "Le libellé doit contenir au moins 2 caractères.",
    "any.required": "Le libellé est obligatoire.",
  }),
  anneeScolaire: Joi.string().pattern(anneeScolaireRegex).required().messages({
    "string.empty": "L'année scolaire est obligatoire.",
    "string.pattern.base": "L'année scolaire doit être au format YYYY-YYYY (ex: 2025-2026).",
    "any.required": "L'année scolaire est obligatoire.",
  }),
});

export const updateClasseSchema = Joi.object({
  code: Joi.string().min(1).messages({
    "string.empty": "Le code ne peut pas être vide.",
  }),
  libelle: Joi.string().min(2).messages({
    "string.min": "Le libellé doit contenir au moins 2 caractères.",
  }),
  anneeScolaire: Joi.string().pattern(anneeScolaireRegex).messages({
    "string.pattern.base": "L'année scolaire doit être au format YYYY-YYYY (ex: 2025-2026).",
  }),
}).min(1).messages({
  "object.min": "Au moins un champ doit être fourni pour la mise à jour.",
});