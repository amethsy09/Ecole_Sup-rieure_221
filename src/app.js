import "dotenv/config";
import express from "express";
import Routes from "./routes/index.js";
import { setupSwagger } from "./config/swagger.js";

export default class App {
  constructor() {
    this.app = express();
    this.uri = process.env.URI;
    this.app.use(express.json());

    setupSwagger(this.app);

    this.route = new Routes(this.app);
  }

  getApp() {
    return this.app;
  }
}
