import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import env from "./env.js";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Gestion Ecole API",
      version: "1.0.0",
      description: "API documentation for the Ecole Management System",
      contact: {
        name: "Ecole Team",
        email: "contact@ecole.com",
      },
    },
    servers: [
      {
        url: env.URI,
        description: "Development server",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
          description: "Enter your JWT token",
        },
      },
      schemas: {
        Cours: {
          type: "object",
          required: ["code", "libelle", "coefficient", "volumeHoraire"],
          properties: {
            id: { type: "integer", example: 1 },
            code: { type: "string", example: "INFO101" },
            libelle: {
              type: "string",
              example: "Introduction à l'informatique",
            },
            coefficient: {
              type: "number",
              format: "float",
              example: 3.5,
            },
            volumeHoraire: { type: "integer", example: 30 },
            createdAt: { type: "string", format: "date-time" },
            updatedAt: { type: "string", format: "date-time" },
          },
        },
        Etudiant: {
          type: "object",
          required: ["prenom", "nom", "email", "dateNaissance", "classeId"],
          properties: {
            id: { type: "integer", example: 1 },
            prenom: { type: "string", example: "Awa" },
            nom: { type: "string", example: "Diop" },
            email: { type: "string", example: "awa.diop@ecole221.sn" },
            dateNaissance: { type: "string", format: "date" },
            classeId: { type: "integer", example: 1 },
            createdAt: { type: "string", format: "date-time" },
            updatedAt: { type: "string", format: "date-time" },
          },
        },
        Error: {
          type: "object",
          properties: {
            message: { type: "string", example: "Error message" },
          },
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: [
    "./src/routes/*.js",
    "./src/controllers/*.js",
    "./src/config/swagger-annotation.js",
  ],
};

const swaggerSpec = swaggerJsdoc(options);

export const setupSwagger = (app) => {
  app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec, {
      customCss: ".swagger-ui .topbar { display: none }",
      customSiteTitle: "Gestion Ecole API Docs",
    }),
  );

  app.get("/api-docs.json", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerSpec);
  });
};

export default swaggerSpec;