/**
 * @swagger
 * tags:
 *   name: Cours
 *   description: API pour la gestion des cours
 */

/**
 * @swagger
 * /cours:
 *   get:
 *     summary: Récupérer tous les cours
 *     tags: [Cours]
 *     responses:
 *       200:
 *         description: Liste des cours
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Cours'
 *       500:
 *         description: Erreur serveur
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

/**
 * @swagger
 * /cours/{id}:
 *   get:
 *     summary: Récupérer un cours par son ID
 *     tags: [Cours]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID du cours
 *     responses:
 *       200:
 *         description: Détails du cours
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cours'
 *       404:
 *         description: Cours non trouvé
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Erreur serveur
 */

/**
 * @swagger
 * /cours:
 *   post:
 *     summary: Créer un nouveau cours
 *     tags: [Cours]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - code
 *               - libelle
 *               - coefficient
 *               - volumeHoraire
 *             properties:
 *               code:
 *                 type: string
 *                 example: INFO101
 *               libelle:
 *                 type: string
 *                 example: "Introduction à l'informatique"
 *               coefficient:
 *                 type: number
 *                 format: float
 *                 example: 3.5
 *               volumeHoraire:
 *                 type: integer
 *                 example: 30
 *     responses:
 *       201:
 *         description: Le cours a été créé avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cours'
 *       400:
 *         description: Requête invalide ou erreur de validation (ex. code déjà existant, volume négatif)
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

/**
 * @swagger
 * /cours/{id}:
 *   put:
 *     summary: Mettre à jour un cours existant
 *     tags: [Cours]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID du cours à mettre à jour
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               code:
 *                 type: string
 *                 example: INFO102
 *               libelle:
 *                 type: string
 *               coefficient:
 *                 type: number
 *                 format: float
 *               volumeHoraire:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Le cours a été mis à jour
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cours'
 *       400:
 *         description: Erreur de validation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

/**
 * @swagger
 * /cours/{id}:
 *   delete:
 *     summary: Supprimer un cours
 *     tags: [Cours]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID du cours à supprimer
 *     responses:
 *       200:
 *         description: Cours supprimé avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       400:
 *         description: Impossible de supprimer le cours (ex. étudiants inscrits) ou ID invalide
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
