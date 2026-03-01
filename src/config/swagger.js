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
   
    }
  },
  apis: ["./src/routes/*.js","./src/config/swagger-annotation.js", "./src/models/*.js"],
};

const swaggerSpec = swaggerJsdoc(options);

export { swaggerUi, swaggerSpec };
