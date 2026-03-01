import { Router } from "express";
import {
  handleCreateClasse,
  handleGetAllClasses,
  handleGetClasseById,
  handleUpdateClasse,
  handleArchiveClasse,
  handleDeleteClasse,
} from "../contrôleurs/classe.controller.js";

const router = Router();

// POST /api/classes - Créer une classe
router.post("/", handleCreateClasse);

// GET /api/classes - Lister les classes (?archived=true pour inclure archivées)
router.get("/", handleGetAllClasses);

// GET /api/classes/:id - Détail d'une classe
router.get("/:id", handleGetClasseById);

// PUT /api/classes/:id - Modifier une classe
router.put("/:id", handleUpdateClasse);

// PATCH /api/classes/:id/archive - Archiver une classe
router.patch("/:id/archive", handleArchiveClasse);

// DELETE /api/classes/:id - Supprimer une classe
router.delete("/:id", handleDeleteClasse);

export default router;