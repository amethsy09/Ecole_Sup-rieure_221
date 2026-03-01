import express from "express";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./config/swagger.js";
import Routes from "./routes/index.js";
class App {
  constructor() {
    this.app = express();
    this.initializeMiddlewares();
    this.initializeRoutes();
    this.initializeSwagger();
  }

  initializeMiddlewares() {
    this.app.use(express.json());
  }

  initializeRoutes() {
    new Routes(this.app);
  }

  initializeSwagger() {
    this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  }

  getApp() {
    return this.app;
  }
}

export default App;