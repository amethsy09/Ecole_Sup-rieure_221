import "dotenv/config";
import express from "express";

export default class Routes {
  constructor(app) {
    this.app = app;
    this.initializeRoutes();
  }

  async initializeRoutes() {
  const { default: EtudiantRoute } = await import("./etudiant.routes.js");
  const etudiantRoute = new EtudiantRoute();
  this.app.use("/etudiants", etudiantRoute.getRouter());
  }
}