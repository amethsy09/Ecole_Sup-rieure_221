import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { URI } from "./env.js";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Ecole Supérieure 221 - API",
      version: "1.0.0",
      description: "API de gestion scolaire - Classes, Étudiants, Cours, Inscriptions",
    },
    servers: [
      {
        url: URI,
      },
    ],
  },
  apis: ["./source/configuration/swagger-annotation.js"],
};

const swaggerSpec = swaggerJsdoc(options);

export function setupSwagger(app) {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  console.log(`Swagger disponible sur ${URI}/api-docs`);
}