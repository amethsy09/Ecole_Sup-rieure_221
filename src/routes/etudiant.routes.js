import { Router } from "express";
import validate from "../middlewares/validate.js";
import { createEtudiantSchema } from "../validations/etudiant.schema.js";
import * as ctrl from "../controllers/etudiant.controller.js";
import { multerConfig } from "../config/multer.js";

export default class EtudiantRoute {
  constructor() {
    this.router = Router();
    this.registerRoutes();
  }

  registerRoutes() {
    this.router.get("/", ctrl.list);
    this.router.post("/", multerConfig.getUpload().single("image"),validate(createEtudiantSchema), ctrl.create);
    this.router.delete("/:id", ctrl.remove);
  }

  getRouter() {
    return this.router;
  }
}