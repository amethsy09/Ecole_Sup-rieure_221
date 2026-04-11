import { Router } from "express";
import { createToken } from "../controllers/auth.controller.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   - name: Auth
 *     description: Endpoints d'authentification
 */

/**
 * @swagger
 * /api/auth/token:
 *   post:
 *     summary: Connexion et generation de token
 *     description: Genere un token d'acces pour appeler les endpoints proteges.
 *     tags: [Auth]
 *     security: []
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               subject:
 *                 type: string
 *                 example: "dev1"
 *     responses:
 *       201:
 *         description: Token genere avec succes
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Token genere avec succes."
 *                 data:
 *                   type: object
 *                   properties:
 *                     token:
 *                       type: string
 *                     tokenType:
 *                       type: string
 *                       example: "Bearer"
 *                     expiresAt:
 *                       type: string
 *                       format: date-time
 *                     expiresInMinutes:
 *                       type: integer
 *                       example: 120
 */
router.post("/token", createToken);

export default router;
