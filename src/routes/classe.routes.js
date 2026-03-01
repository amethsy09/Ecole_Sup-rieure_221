import { Router } from "express";
import ClasseController from "../controllers/classe.controller.js";

const router = Router();
const classeController = new ClasseController();

// POST /api/classes - Créer une classe
router.post("/", (req, res) => classeController.createClasse(req, res));

// GET /api/classes - Lister les classes (?archived=true pour inclure archivées)
router.get("/", (req, res) => classeController.getAllClasses(req, res));

// GET /api/classes/:id - Détail d'une classe
router.get("/:id", (req, res) => classeController.getClasseById(req, res));

// PUT /api/classes/:id - Modifier une classe
router.put("/:id", (req, res) => classeController.updateClasse(req, res));

// PATCH /api/classes/:id/archive - Archiver une classe
router.patch("/:id/archive", (req, res) => classeController.archiveClasse(req, res));

// DELETE /api/classes/:id - Supprimer une classe
router.delete("/:id", (req, res) => classeController.deleteClasse(req, res));

export default router;