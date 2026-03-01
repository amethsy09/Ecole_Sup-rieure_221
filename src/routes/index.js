import "dotenv/config";
import express from "express";

export default class Routes {
  constructor(app) {
    this.app = app;
    this.initializeRoutes();
  }

  async initializeRoutes() {
    const { default: CoursRoute } = await import("./cours.routes.js");

    const coursRoute = new CoursRoute();

    this.app.use("/cours", coursRoute.getRouter());
  }
}
