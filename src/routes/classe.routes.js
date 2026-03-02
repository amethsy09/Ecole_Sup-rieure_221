import express from "express";
import ClasseController from "../controllers/classe.controller.js";

export default class ClasseRoute {
  constructor() {
    this.router = express.Router();
    this.controller = new ClasseController();
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.get("/", this.controller.getAllClasses.bind(this.controller));
    this.router.get("/:id", this.controller.getClasseById.bind(this.controller));
    this.router.post("/", this.controller.createClasse.bind(this.controller));
    this.router.put("/:id", this.controller.updateClasse.bind(this.controller));
    this.router.patch("/:id/archive", this.controller.archiveClasse.bind(this.controller));
    this.router.delete("/:id", this.controller.deleteClasse.bind(this.controller));
  }

  getRouter() {
    return this.router;
  }
}
