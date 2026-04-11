// src/routes/index.js
import InscriptionRoute from "./inscription.routes.js";
import EtudiantRoute from "./etudiant.routes.js";
import CoursRoute from "./cours.routes.js";
import ClasseRoute from "./classe.routes.js";
import SousClasseRoute from "./sousclasse.routes.js";
import AuthRoute from "./auth.routes.js";
import authToken from "../middlewares/authToken.js";

export default class Routes {
  constructor(app) {
    this.app = app;
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.app.get("/", (req, res) => {
      res.send("Bienvenue sur l'API de gestion de l'école !");
    });

    // Route publique pour generer un token
    this.app.use("/api/auth", AuthRoute);

    // Toutes les routes /api/* sont protegees par token.
    this.app.use("/api", authToken);

    this.app.use("/api/inscriptions", InscriptionRoute);

    const classeRoute = new ClasseRoute();
    this.app.use("/api/classes", classeRoute.getRouter());

    const coursRoute = new CoursRoute();
    this.app.use("/api/cours", coursRoute.getRouter());

    const etudiantRoute = new EtudiantRoute();
    this.app.use("/api/etudiants", etudiantRoute.getRouter());

    const sousClasseRoute = new SousClasseRoute();
    this.app.use("/api/sousclasses", sousClasseRoute.getRouter());
  }
}
