import InscriptionRepository from '../repositories/inscription.repo.js';
import database from '../config/db.js';
class InscriptionService {
  constructor() {
    this.repo = new InscriptionRepository();
    this.prisma = database.getClient();
  }
  validateInscriptionDate(date) {
    if(!date) return false;
    const inscriptionDate = new Date(date);
    const today = new Date();
    return inscriptionDate <= today;
  }
  async verifyEtudiantCours(etudiantId, coursId) {
    const [etudiant, cours] = await Promise.all([
      this.prisma.etudiant.findUnique({
        where: { id: parseInt(etudiantId) },
        include: { classe: true }
      }),
      this.prisma.cours.findUnique({
        where: { id: parseInt(coursId) }
      })
    ]);

    if (!etudiant) {
      throw {
        status: 404,
        message: `L'étudiant avec l'ID ${etudiantId} n'existe pas`,
        code: 'ETUDIANT_NOT_FOUND'
      };
    }
    if (!cours) {
      throw {
        status: 404,
        message: `Le cours avec l'ID ${coursId} n'existe pas`,
        code: 'COURS_NOT_FOUND'
      };
    }
    return { etudiant, cours };
  }
   /**
   * Inscrire un étudiant à un cours avec gestion des doublons
   */
  async inscrireEtudiant(data) {
    const { etudiantId, coursId, dateInscription } = data;

    // 1. Valider le format de la date
    if (!dateInscription || isNaN(new Date(dateInscription).getTime())) {
      throw {
        status: 400,
        message: 'Format de date invalide',
        code: 'INVALID_DATE_FORMAT'
      };
    }

    // 2. Valider que la date n'est pas dans le futur
    if (!this.validateDateInscription(dateInscription)) {
      throw {
        status: 400,
        message: 'La date d\'inscription ne peut pas être dans le futur',
        code: 'FUTURE_DATE_NOT_ALLOWED'
      };
    }

    // 3. Vérifier que l'étudiant et le cours existent
    const { etudiant, cours } = await this.checkEntitiesExist(etudiantId, coursId);

    // 4. Vérifier les doublons
    const existingInscription = await this.repo.findByEtudiantAndCours(
      etudiantId,
      coursId
    );

    if (existingInscription) {
      if (existingInscription.statut === 'ACTIVE') {
        return {
          success: false,
          code: 'DOUBLON_ACTIF',
          message: `${etudiant.prenom} ${etudiant.nom} est déjà inscrit(e) au cours ${cours.libelle}`,
          inscription: existingInscription
        };
      } else if (existingInscription.statut === 'ANNULEE') {
        return {
          success: false,
          code: 'DOUBLON_ANNULE',
          message: 'Une inscription annulée existe. Voulez-vous la réactiver ?',
          action: 'REACTIVER',
          inscriptionId: existingInscription.id,
          inscription: existingInscription
        };
      }
    }

    // 5. Créer la nouvelle inscription
    const newInscription = await this.repo.create({
      etudiantId: parseInt(etudiantId),
      coursId: parseInt(coursId),
      dateInscription: new Date(dateInscription),
      statut: 'ACTIVE'
    });

    return {
      success: true,
      message: `${etudiant.prenom} ${etudiant.nom} a été inscrit(e) avec succès au cours ${cours.libelle}`,
      inscription: newInscription
    };
  }
 async getAllInscriptions(filters = {}) {
    try {
      return await this.repo.findAll(filters);
    } catch (error) {
      console.error('Erreur dans getAllInscriptions:', error);
      throw error;
    }
  }
    async checkEntitiesExist(etudiantId, coursId) {
    const [etudiant, cours] = await Promise.all([
      this.prisma.etudiant.findUnique({
        where: { id: parseInt(etudiantId) },
        include: { classe: true }
      }),
      this.prisma.cours.findUnique({
        where: { id: parseInt(coursId) }
      })
    ]);

    if (!etudiant) {
      throw {
        status: 404,
        message: `L'étudiant avec l'ID ${etudiantId} n'existe pas`,
        code: 'ETUDIANT_NOT_FOUND'
      };
    }
    if (!cours) {
      throw {
        status: 404,
        message: `Le cours avec l'ID ${coursId} n'existe pas`,
        code: 'COURS_NOT_FOUND'
      };
    }
    return { etudiant, cours };
}


  }
  export default InscriptionService;
