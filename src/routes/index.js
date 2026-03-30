// src/routes/index.js
import express from "express";
import InscriptionRoute from "./inscription.routes.js";
import EtudiantRoute from "./etudiant.routes.js";
import CoursRoute from "./cours.routes.js";
import ClasseRoute from "./classe.routes.js";

export default class Routes {
  constructor(app) {
    this.app = app;
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.app.get("/", (req, res) => {
      res.send("Bienvenue sur l'API de gestion de l'école !");
    });

    // Inscriptions (C'est déjà un router)
    this.app.use("/api/inscriptions", InscriptionRoute);

    // Classes
    const classeRoute = new ClasseRoute();
    this.app.use("/api/classes", classeRoute.getRouter());

    // Cours
    const coursRoute = new CoursRoute();
    this.app.use("/api/cours", coursRoute.getRouter());

    // Etudiants
    const etudiantRoute = new EtudiantRoute();
    this.app.use("/api/etudiants", etudiantRoute.getRouter());
  }
}