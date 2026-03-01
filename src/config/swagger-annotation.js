/**
 * @swagger
 * components:
 *   schemas:
 *     Classe:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         code:
 *           type: string
 *           example: "L1-INFO"
 *         libelle:
 *           type: string
 *           example: "Licence 1 Informatique"
 *         anneeScolaire:
 *           type: string
 *           example: "2025-2026"
 *         archived:
 *           type: boolean
 *           example: false
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *
 *     ClasseInput:
 *       type: object
 *       required:
 *         - code
 *         - libelle
 *         - anneeScolaire
 *       properties:
 *         code:
 *           type: string
 *           example: "L1-INFO"
 *         libelle:
 *           type: string
 *           example: "Licence 1 Informatique"
 *         anneeScolaire:
 *           type: string
 *           example: "2025-2026"
 *
 *     ClasseUpdateInput:
 *       type: object
 *       properties:
 *         code:
 *           type: string
 *           example: "L1-INFO"
 *         libelle:
 *           type: string
 *           example: "Licence 1 Informatique"
 *         anneeScolaire:
 *           type: string
 *           example: "2025-2026"
 *
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: false
 *         message:
 *           type: string
 *         errors:
 *           type: array
 *           items:
 *             type: string
 */

/**
 * @swagger
 * tags:
 *   name: Classes
 *   description: Gestion des classes scolaires
 */

/**
 * @swagger
 * /api/classes:
 *   post:
 *     summary: Créer une nouvelle classe
 *     tags: [Classes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ClasseInput'
 *     responses:
 *       201:
 *         description: Classe créée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/Classe'
 *       400:
 *         description: Données invalides
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       409:
 *         description: Code + année scolaire déjà existants
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

/**
 * @swagger
 * /api/classes:
 *   get:
 *     summary: Lister toutes les classes
 *     tags: [Classes]
 *     parameters:
 *       - in: query
 *         name: archived
 *         schema:
 *           type: boolean
 *         description: Inclure les classes archivées (true/false)
 *     responses:
 *       200:
 *         description: Liste des classes
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Classe'
 */

/**
 * @swagger
 * /api/classes/{id}:
 *   get:
 *     summary: Obtenir une classe par son ID
 *     tags: [Classes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Détail de la classe
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   $ref: '#/components/schemas/Classe'
 *       404:
 *         description: Classe introuvable
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

/**
 * @swagger
 * /api/classes/{id}:
 *   put:
 *     summary: Modifier une classe
 *     tags: [Classes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ClasseUpdateInput'
 *     responses:
 *       200:
 *         description: Classe modifiée avec succès
 *       400:
 *         description: Données invalides
 *       404:
 *         description: Classe introuvable
 *       409:
 *         description: Code + année scolaire déjà existants
 */

/**
 * @swagger
 * /api/classes/{id}/archive:
 *   patch:
 *     summary: Archiver une classe (soft delete)
 *     tags: [Classes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Classe archivée avec succès
 *       404:
 *         description: Classe introuvable
 *       409:
 *         description: Impossible d'archiver, des étudiants sont inscrits
 */

/**
 * @swagger
 * /api/classes/{id}:
 *   delete:
 *     summary: Supprimer définitivement une classe
 *     tags: [Classes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Classe supprimée avec succès
 *       404:
 *         description: Classe introuvable
 *       409:
 *         description: Impossible de supprimer, des étudiants sont inscrits
 */