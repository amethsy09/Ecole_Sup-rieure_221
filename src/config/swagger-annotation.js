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
 * :       description: Erreur serveur
 */
/**
 * @swagger
 * tags:
 *   name: Inscriptions
 *   description: API pour la gestion des inscriptions des étudiants aux cours
 */

/**
 * @swagger
 * tags:
 *   name: Services
 *   description: Endpoints services pour les autres développeurs
 */

// ========== SCHÉMAS ==========

/**
 * @swagger
 * components:
 *   schemas:
 *     Inscription:
 *       type: object
 *       required:
 *         - etudiantId
 *         - coursId
 *         - dateInscription
 *         - statut
 *       properties:
 *         id:
 *           type: integer
 *           description: ID auto-généré de l'inscription
 *           example: 1
 *         etudiantId:
 *           type: integer
 *           description: ID de l'étudiant
 *           example: 5
 *         coursId:
 *           type: integer
 *           description: ID du cours
 *           example: 3
 *         dateInscription:
 *           type: string
 *           format: date
 *           description: Date de l'inscription (ne peut pas être dans le futur)
 *           example: "2026-02-28"
 *         statut:
 *           type: string
 *           enum: [ACTIVE, ANNULEE]
 *           description: Statut de l'inscription
 *           example: "ACTIVE"
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Date de création
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Date de dernière modification
 *       example:
 *         id: 1
 *         etudiantId: 5
 *         coursId: 3
 *         dateInscription: "2026-02-28"
 *         statut: "ACTIVE"
 *         createdAt: "2026-02-28T10:30:00Z"
 *         updatedAt: "2026-02-28T10:30:00Z"
 *
 *     InscriptionDetaillee:
 *       allOf:
 *         - $ref: '#/components/schemas/Inscription'
 *         - type: object
 *           properties:
 *             etudiant:
 *               $ref: '#/components/schemas/Etudiant'
 *             cours:
 *               $ref: '#/components/schemas/Cours'
 *
 *     InscriptionInput:
 *       type: object
 *       required:
 *         - etudiantId
 *         - coursId
 *         - dateInscription
 *       properties:
 *         etudiantId:
 *           type: integer
 *           description: ID de l'étudiant à inscrire
 *           example: 5
 *         coursId:
 *           type: integer
 *           description: ID du cours auquel inscrire
 *           example: 3
 *         dateInscription:
 *           type: string
 *           format: date
 *           description: Date de l'inscription (ne doit pas être dans le futur)
 *           example: "2026-02-28"
 *
 *     InscriptionReactiverInput:
 *       type: object
 *       required:
 *         - inscriptionId
 *       properties:
 *         inscriptionId:
 *           type: integer
 *           description: ID de l'inscription à réactiver
 *           example: 1
 *
 *     InscriptionResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         message:
 *           type: string
 *           example: "Jean Dupont a été inscrit(e) avec succès au cours Algorithmique avancée"
 *         inscription:
 *           $ref: '#/components/schemas/InscriptionDetaillee'
 *
 *     InscriptionError:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: false
 *         code:
 *           type: string
 *           enum: [DOUBLON_ACTIF, DOUBLON_ANNULE, ETUDIANT_NOT_FOUND, COURS_NOT_FOUND, INVALID_DATE_FORMAT, FUTURE_DATE_NOT_ALLOWED, INSCRIPTION_NOT_FOUND, ALREADY_ACTIVE, ALREADY_CANCELLED]
 *         message:
 *           type: string
 *         action:
 *           type: string
 *           enum: [REACTIVER]
 *           description: Action possible (si applicable)
 *         inscriptionId:
 *           type: integer
 *           description: ID de l'inscription concernée (si applicable)
 *
 *     CheckSuppressionResponse:
 *       type: object
 *       properties:
 *         peutSupprimer:
 *           type: boolean
 *           example: false
 *         raison:
 *           type: string
 *           nullable: true
 *           example: "L'étudiant a 2 inscription(s) active(s)"
 *         nombreInscriptions:
 *           type: integer
 *           example: 2
 *         etudiantId:
 *           type: integer
 *           example: 5
 *         coursId:
 *           type: integer
 *           example: 3
 *
 *     InscriptionStats:
 *       type: object
 *       properties:
 *         total:
 *           type: integer
 *           description: Nombre total d'inscriptions
 *           example: 150
 *         actives:
 *           type: integer
 *           description: Nombre d'inscriptions actives
 *           example: 120
 *         annulees:
 *           type: integer
 *           description: Nombre d'inscriptions annulées
 *           example: 30
 *         moyenneCoursParEtudiant:
 *           type: number
 *           format: float
 *           description: Nombre moyen de cours par étudiant
 *           example: 2.5
 *         inscriptionsRecentes:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *               etudiant:
 *                 type: object
 *                 properties:
 *                   prenom:
 *                     type: string
 *                   nom:
 *                     type: string
 *               cours:
 *                 type: object
 *                 properties:
 *                   libelle:
 *                     type: string
 */

// ========== ENDPOINTS INSCRIPTIONS ==========

/**
 * @swagger
 * /api/inscriptions:
 *   get:
 *     summary: Récupérer toutes les inscriptions
 *     tags: [Inscriptions]
 *     parameters:
 *       - in: query
 *         name: etudiantId
 *         schema:
 *           type: integer
 *         description: Filtrer par ID étudiant
 *         example: 5
 *       - in: query
 *         name: coursId
 *         schema:
 *           type: integer
 *         description: Filtrer par ID cours
 *         example: 3
 *       - in: query
 *         name: statut
 *         schema:
 *           type: string
 *           enum: [ACTIVE, ANNULEE]
 *         description: Filtrer par statut
 *         example: "ACTIVE"
 *     responses:
 *       200:
 *         description: Liste des inscriptions
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 count:
 *                   type: integer
 *                   example: 5
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/InscriptionDetaillee'
 *       500:
 *         description: Erreur serveur
 */

/**
 * @swagger
 * /api/inscriptions/{id}:
 *   get:
 *     summary: Récupérer une inscription par son ID
 *     tags: [Inscriptions]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de l'inscription
 *         example: 1
 *     responses:
 *       200:
 *         description: Détails de l'inscription
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/InscriptionDetaillee'
 *       404:
 *         description: Inscription non trouvée
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Inscription non trouvée"
 *       500:
 *         description: Erreur serveur
 */

/**
 * @swagger
 * /api/inscriptions:
 *   post:
 *     summary: Créer une nouvelle inscription
 *     tags: [Inscriptions]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/InscriptionInput'
 *     responses:
 *       201:
 *         description: Inscription créée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/InscriptionResponse'
 *       400:
 *         description: Erreur de validation (date future, format invalide)
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/InscriptionError'
 *       404:
 *         description: Étudiant ou cours non trouvé
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/InscriptionError'
 *       409:
 *         description: Conflit - Inscription déjà existante
 *         content:
 *           application/json:
 *             schema:
 *               oneOf:
 *                 - $ref: '#/components/schemas/InscriptionError'
 *                 - type: object
 *                   properties:
 *                     success:
 *                       type: boolean
 *                       example: false
 *                     code:
 *                       type: string
 *                       example: "DOUBLON_ANNULE"
 *                     message:
 *                       type: string
 *                       example: "Une inscription annulée existe. Voulez-vous la réactiver ?"
 *                     action:
 *                       type: string
 *                       example: "REACTIVER"
 *                     inscriptionId:
 *                       type: integer
 *                       example: 1
 *       500:
 *         description: Erreur serveur
 */

/**
 * @swagger
 * /api/inscriptions/{id}/annuler:
 *   put:
 *     summary: Annuler une inscription active
 *     tags: [Inscriptions]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de l'inscription à annuler
 *         example: 1
 *     responses:
 *       200:
 *         description: Inscription annulée avec succès
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
 *                   example: "Inscription annulée avec succès"
 *                 inscription:
 *                   $ref: '#/components/schemas/InscriptionDetaillee'
 *       400:
 *         description: Inscription déjà annulée
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Cette inscription est déjà annulée"
 *                 code:
 *                   type: string
 *                   example: "ALREADY_CANCELLED"
 *       404:
 *         description: Inscription non trouvée
 *       500:
 *         description: Erreur serveur
 */

/**
 * @swagger
 * /api/inscriptions/reactiver:
 *   post:
 *     summary: Réactiver une inscription annulée
 *     tags: [Inscriptions]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/InscriptionReactiverInput'
 *     responses:
 *       200:
 *         description: Inscription réactivée avec succès
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
 *                   example: "Inscription réactivée avec succès"
 *                 inscription:
 *                   $ref: '#/components/schemas/InscriptionDetaillee'
 *       400:
 *         description: Inscription déjà active
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Cette inscription est déjà active"
 *                 code:
 *                   type: string
 *                   example: "ALREADY_ACTIVE"
 *       404:
 *         description: Inscription non trouvée
 *       500:
 *         description: Erreur serveur
 */

/**
 * @swagger
 * /api/inscriptions/etudiant/{etudiantId}:
 *   get:
 *     summary: Récupérer toutes les inscriptions d'un étudiant
 *     tags: [Inscriptions]
 *     parameters:
 *       - in: path
 *         name: etudiantId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de l'étudiant
 *         example: 5
 *       - in: query
 *         name: statut
 *         schema:
 *           type: string
 *           enum: [ACTIVE, ANNULEE]
 *         description: Filtrer par statut
 *         example: "ACTIVE"
 *     responses:
 *       200:
 *         description: Liste des inscriptions de l'étudiant
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 count:
 *                   type: integer
 *                   example: 3
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/InscriptionDetaillee'
 *       404:
 *         description: Étudiant non trouvé
 *       500:
 *         description: Erreur serveur
 */

/**
 * @swagger
 * /api/inscriptions/cours/{coursId}:
 *   get:
 *     summary: Récupérer toutes les inscriptions à un cours
 *     tags: [Inscriptions]
 *     parameters:
 *       - in: path
 *         name: coursId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID du cours
 *         example: 3
 *       - in: query
 *         name: statut
 *         schema:
 *           type: string
 *           enum: [ACTIVE, ANNULEE]
 *         description: Filtrer par statut
 *         example: "ACTIVE"
 *     responses:
 *       200:
 *         description: Liste des inscriptions au cours
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 count:
 *                   type: integer
 *                   example: 15
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/InscriptionDetaillee'
 *       404:
 *         description: Cours non trouvé
 *       500:
 *         description: Erreur serveur
 */

/**
 * @swagger
 * /api/inscriptions/stats:
 *   get:
 *     summary: Récupérer les statistiques des inscriptions
 *     tags: [Inscriptions]
 *     responses:
 *       200:
 *         description: Statistiques des inscriptions
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/InscriptionStats'
 *       500:
 *         description: Erreur serveur
 */

/**
 * @swagger
 * /api/inscriptions/{id}:
 *   delete:
 *     summary: Supprimer une inscription (utilisation rare)
 *     tags: [Inscriptions]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de l'inscription à supprimer
 *         example: 1
 *     responses:
 *       200:
 *         description: Inscription supprimée avec succès
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
 *                   example: "Inscription supprimée avec succès"
 *       404:
 *         description: Inscription non trouvée
 *       500:
 *         description: Erreur serveur
 */

// ========== ENDPOINTS SERVICES POUR AUTRES DÉVELOPPEURS ==========

/**
 * @swagger
 * /api/inscriptions/check/etudiant/{etudiantId}:
 *   get:
 *     summary: "[SERVICE] Vérifier si un étudiant peut être supprimé"
 *     description: "Endpoint à utiliser par Dev2 pour vérifier avant suppression d'un étudiant"
 *     tags: [Services]
 *     parameters:
 *       - in: path
 *         name: etudiantId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de l'étudiant à vérifier
 *         example: 5
 *     responses:
 *       200:
 *         description: Résultat de la vérification
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CheckSuppressionResponse'
 *             examples:
 *               peutSupprimer:
 *                 value:
 *                   peutSupprimer: true
 *                   raison: null
 *                   nombreInscriptions: 0
 *                   etudiantId: 5
 *               nePeutPasSupprimer:
 *                 value:
 *                   peutSupprimer: false
 *                   raison: "L'étudiant a 2 inscription(s) active(s)"
 *                   nombreInscriptions: 2
 *                   etudiantId: 5
 *               nonTrouve:
 *                 value:
 *                   peutSupprimer: false
 *                   raison: "Étudiant non trouvé"
 *                   code: "ETUDIANT_NOT_FOUND"
 *       500:
 *         description: Erreur serveur
 */

/**
 * @swagger
 * /api/inscriptions/check/cours/{coursId}:
 *   get:
 *     summary: "[SERVICE] Vérifier si un cours peut être supprimé"
 *     description: "Endpoint à utiliser par Dev3 pour vérifier avant suppression d'un cours"
 *     tags: [Services]
 *     parameters:
 *       - in: path
 *         name: coursId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID du cours à vérifier
 *         example: 3
 *     responses:
 *       200:
 *         description: Résultat de la vérification
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CheckSuppressionResponse'
 *             examples:
 *               peutSupprimer:
 *                 value:
 *                   peutSupprimer: true
 *                   raison: null
 *                   nombreInscriptions: 0
 *                   coursId: 3
 *               nePeutPasSupprimer:
 *                 value:
 *                   peutSupprimer: false
 *                   raison: "Le cours a 15 inscription(s) active(s)"
 *                   nombreInscriptions: 15
 *                   coursId: 3
 *               nonTrouve:
 *                 value:
 *                   peutSupprimer: false
 *                   raison: "Cours non trouvé"
 *                   code: "COURS_NOT_FOUND"
 *       500:
 *         description: Erreur serveur
 */