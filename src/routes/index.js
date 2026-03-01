// src/routes/index.js
import express from "express";
import inscriptionRoutes from "./inscription.routes.js";
//import etudiantRoutes from "./etudiant.routes.js";
//import coursRoutes from "./cours.routes.js";
export default class Routes {
  constructor(app) {
    this.app = app;
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.app.get("/", (req, res) => {
      res.send("Bienvenue sur l'API de gestion de l'école !");
    });
    this.app.use("/api/inscriptions", inscriptionRoutes);
    //this.app.use("/api/etudiants", etudiantRoutes);
   // this.app.use("/api/cours", coursRoutes);
    
  
  }
  
}