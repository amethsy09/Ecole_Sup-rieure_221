import { createClasseSchema, updateClasseSchema } from "../validators/classe.validator.js";
import {
  createClasse,
  getAllClasses,
  getClasseById,
  updateClasse,
  archiveClasse,
  deleteClasse,
} from "../services/classe.service.js";

// POST /api/classes
export async function handleCreateClasse(req, res) {
  const { error, value } = createClasseSchema.validate(req.body, { abortEarly: false });
  if (error) {
    return res.status(400).json({
      success: false,
      message: "Données invalides.",
      errors: error.details.map((d) => d.message),
    });
  }
  try {
    const classe = await createClasse(value);
    return res.status(201).json({ success: true, data: classe });
  } catch (err) {
    return res.status(err.statusCode || 500).json({ success: false, message: err.message });
  }
}

// GET /api/classes
export async function handleGetAllClasses(req, res) {
  try {
    const includeArchived = req.query.archived === "true";
    const classes = await getAllClasses(includeArchived);
    return res.status(200).json({ success: true, data: classes });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
}

// GET /api/classes/:id
export async function handleGetClasseById(req, res) {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    return res.status(400).json({ success: false, message: "L'ID doit être un nombre entier." });
  }
  try {
    const classe = await getClasseById(id);
    return res.status(200).json({ success: true, data: classe });
  } catch (err) {
    return res.status(err.statusCode || 500).json({ success: false, message: err.message });
  }
}

// PUT /api/classes/:id
export async function handleUpdateClasse(req, res) {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    return res.status(400).json({ success: false, message: "L'ID doit être un nombre entier." });
  }
  const { error, value } = updateClasseSchema.validate(req.body, { abortEarly: false });
  if (error) {
    return res.status(400).json({
      success: false,
      message: "Données invalides.",
      errors: error.details.map((d) => d.message),
    });
  }
  try {
    const classe = await updateClasse(id, value);
    return res.status(200).json({ success: true, data: classe });
  } catch (err) {
    return res.status(err.statusCode || 500).json({ success: false, message: err.message });
  }
}

// PATCH /api/classes/:id/archive
export async function handleArchiveClasse(req, res) {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    return res.status(400).json({ success: false, message: "L'ID doit être un nombre entier." });
  }
  try {
    const classe = await archiveClasse(id);
    return res.status(200).json({ success: true, message: "Classe archivée avec succès.", data: classe });
  } catch (err) {
    return res.status(err.statusCode || 500).json({ success: false, message: err.message });
  }
}

// DELETE /api/classes/:id
export async function handleDeleteClasse(req, res) {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    return res.status(400).json({ success: false, message: "L'ID doit être un nombre entier." });
  }
  try {
    await deleteClasse(id);
    return res.status(200).json({ success: true, message: "Classe supprimée avec succès." });
  } catch (err) {
    return res.status(err.statusCode || 500).json({ success: false, message: err.message });
  }
}