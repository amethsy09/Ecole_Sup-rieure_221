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


//separation du code 

/**
 * @swagger
 * tags:
 *   - name: Etudiants
 *     description: API pour la gestion des étudiants
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Error:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: false
 *         message:
 *           type: string
 *           example: "Erreur"
 *         details:
 *           nullable: true
 *           example: null
 *
 *     ClasseLite:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         code:
 *           type: string
 *           example: "L3-DEV"
 *         libelle:
 *           type: string
 *           example: "Licence 3 Développement"
 *         anneeScolaire:
 *           type: string
 *           example: "2025-2026"
 *         archived:
 *           type: boolean
 *           example: false
 *
 *     Etudiant:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         prenom:
 *           type: string
 *           example: "Awa"
 *         nom:
 *           type: string
 *           example: "Diop"
 *         email:
 *           type: string
 *           example: "awa.diop@ecole221.sn"
 *         dateNaissance:
 *           type: string
 *           format: date
 *           example: "2002-03-14"
 *         classeId:
 *           type: integer
 *           example: 1
 *         classe:
 *           $ref: '#/components/schemas/ClasseLite'
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: "2026-03-01T10:15:30.000Z"
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           example: "2026-03-01T10:15:30.000Z"
 */

/**
 * @swagger
 * /etudiants:
 *   get:
 *     summary: Récupérer tous les étudiants
 *     tags: [Etudiants]
 *     responses:
 *       200:
 *         description: Liste des étudiants
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
 *                   example: "Liste des étudiants"
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Etudiant'
 *       500:
 *         description: Erreur serveur
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

/**
 * @swagger
 * /etudiants:
 *   post:
 *     summary: Créer un nouvel étudiant
 *     tags: [Etudiants]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [prenom, nom, email, dateNaissance, classeId]
 *             properties:
 *               prenom:
 *                 type: string
 *                 minLength: 2
 *                 example: "Awa"
 *               nom:
 *                 type: string
 *                 minLength: 2
 *                 example: "Diop"
 *               email:
 *                 type: string
 *                 example: "awa.diop@ecole221.sn"
 *               dateNaissance:
 *                 type: string
 *                 format: date
 *                 example: "2002-03-14"
 *               classeId:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       201:
 *         description: L'étudiant a été créé avec succès
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
 *                   example: "Etudiant créé"
 *                 data:
 *                   $ref: '#/components/schemas/Etudiant'
 *       400:
 *         description: Requête invalide (validation, classeId invalide, dateNaissance future, email invalide)
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       409:
 *         description: Email déjà utilisé
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

/**
 * @swagger
 * /etudiants/{id}:
 *   delete:
 *     summary: Supprimer un étudiant (bloqué si inscriptions existent)
 *     tags: [Etudiants]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de l'étudiant à supprimer
 *     responses:
 *       200:
 *         description: Etudiant supprimé avec succès
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
 *                   example: "Etudiant supprimé"
 *                 data:
 *                   $ref: '#/components/schemas/Etudiant'
 *       404:
 *         description: Etudiant non trouvé
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       409:
 *         description: Suppression interdite (l'étudiant a des inscriptions)
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Erreur serveur
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */