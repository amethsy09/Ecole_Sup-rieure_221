import classeRoutes from "./classe.routes.js";

export default class Routes {
  constructor(app) {
    // Routes Classes (fbs)
    app.use("/api/classes", classeRoutes);

    // Route 
    app.get("/", (req, res) => {
      res.json({
        success: true,
        message: "API Ecole Supérieure 221 opérationnelle",
        documentation: `${process.env.URI}/api-docs`,
      });
    });
  }
}