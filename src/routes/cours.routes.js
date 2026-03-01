import express from "express";
import CoursController from "../controllers/cours.controller.js";

export default class CoursRoute {
  constructor() {
    this.router = express.Router();
    this.controller = new CoursController();
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.get("/", this.controller.getAllCours.bind(this.controller));
    this.router.get("/:id", this.controller.getCoursById.bind(this.controller));
    this.router.post("/", this.controller.createCours.bind(this.controller));
    this.router.put("/:id", this.controller.updateCours.bind(this.controller));
    this.router.delete(
      "/:id",
      this.controller.deleteCours.bind(this.controller),
    );
  }

  getRouter() {
    return this.router;
  }
}
