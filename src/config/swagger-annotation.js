/**
 * @swagger
 * openapi: 3.0.0
 * info:
 *   title: API Gestion Scolaire - Ecole Supérieure 221
 *   version: 1.0.0
 *   description: >
 *     API REST permettant la gestion des classes scolaires.
 *     Elle permet de créer, consulter, modifier, archiver (soft delete)
 *     et supprimer définitivement des classes.
 *     Toutes les réponses sont retournées au format JSON.
 * servers:
 *   - url: http://localhost:3001
 *     description: Serveur local de développement
 */

/**
 * @swagger
 * tags:
 *   - name: Classes
 *     description: Endpoints liés à la gestion des classes scolaires
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Classe:
 *       type: object
 *       description: Représente une classe scolaire.
 *       properties:
 *         id:
 *           type: integer
 *           description: Identifiant unique de la classe
 *           example: 1
 *         code:
 *           type: string
 *           description: Code unique identifiant la classe
 *           example: "L1-INFO"
 *         libelle:
 *           type: string
 *           description: Nom complet de la classe
 *           example: "Licence 1 Informatique"
 *         anneeScolaire:
 *           type: string
 *           description: Année académique concernée
 *           example: "2025-2026"
 *         archived:
 *           type: boolean
 *           description: Indique si la classe est archivée
 *           example: false
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Date de création
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Date de dernière modification
 *
 *     ClasseInput:
 *       type: object
 *       description: Données nécessaires pour créer une classe
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
 *       description: Données modifiables d'une classe
 *       properties:
 *         code:
 *           type: string
 *         libelle:
 *           type: string
 *         anneeScolaire:
 *           type: string
 *
 *     ErrorResponse:
 *       type: object
 *       description: Structure standard des messages d'erreur
 *       properties:
 *         success:
 *           type: boolean
 *           example: false
 *         message:
 *           type: string
 *           example: "Une erreur est survenue"
 *         errors:
 *           type: array
 *           items:
 *             type: string
 */

/**
 * @swagger
 * /api/classes:
 *   post:
 *     summary: Créer une nouvelle classe
 *     description: >
 *       Permet d'ajouter une nouvelle classe dans le système.
 *       Le couple (code + année scolaire) doit être unique.
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
 *       409:
 *         description: Code + année scolaire déjà existants
 */

/**
 * @swagger
 * /api/classes:
 *   get:
 *     summary: Lister toutes les classes
 *     description: >
 *       Retourne la liste des classes.
 *       Possibilité de filtrer par statut d'archivage via le paramètre query "archived".
 *     tags: [Classes]
 *     parameters:
 *       - in: query
 *         name: archived
 *         schema:
 *           type: boolean
 *         description: Filtrer les classes archivées (true/false)
 *     responses:
 *       200:
 *         description: Liste des classes récupérée avec succès
 */

/**
 * @swagger
 * /api/classes/{id}:
 *   get:
 *     summary: Obtenir une classe par son ID
 *     description: Retourne les informations détaillées d'une classe spécifique.
 *     tags: [Classes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Identifiant de la classe
 *     responses:
 *       200:
 *         description: Classe trouvée
 *       404:
 *         description: Classe introuvable
 */

/**
 * @swagger
 * /api/classes/{id}:
 *   put:
 *     summary: Modifier une classe
 *     description: Met à jour les informations d'une classe existante.
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
 *       404:
 *         description: Classe introuvable
 */

/**
 * @swagger
 * /api/classes/{id}/archive:
 *   patch:
 *     summary: Archiver une classe (soft delete)
 *     description: >
 *       Marque la classe comme archivée sans la supprimer physiquement.
 *       Une classe ne peut pas être archivée si des étudiants y sont inscrits.
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
 *       409:
 *         description: Impossible d'archiver
 */

/**
 * @swagger
 * /api/classes/{id}:
 *   delete:
 *     summary: Supprimer définitivement une classe
 *     description: >
 *       Supprime définitivement la classe de la base de données.
 *       Impossible si des étudiants y sont encore liés.
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
 *         description: Suppression impossible
 */





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
 *//**
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
