import CoursRepository from "../repositories/cours.repo.js";
import inscriptionRepo from "../repositories/inscription.repo.js";
export default class CoursService {
  constructor() {
    this.coursRepository = new CoursRepository();
    this.inscriptionRepository = inscriptionRepo; // pour vérifier les inscriptions avant suppression
  }

  async createCours(data) {
    // La validation est déjà gérée par le layer repository
    return await this.coursRepository.create(data);
  }

  async updateCours(id, data) {
    return await this.coursRepository.update(id, data);
  }

  async deleteCours(id) {
    // 1. Vérifier si le cours existe
    const cours = await this.coursRepository.findById(id);
    if (!cours) {
      const error = new Error(`Cours avec l'ID ${id} introuvable.`);
      error.statusCode = 404;
      throw error;
    }

    // 2. Vérifier si des inscriptions existent pour ce cours
    const inscriptionsCount = await this.inscriptionRepository.countByCours(id);
    
    if (inscriptionsCount > 0) {
      const error = new Error(
        `Suppression impossible : ce cours a ${inscriptionsCount} inscription(s). ` +
        `Veuillez d'abord supprimer les inscriptions.`
      );
      error.statusCode = 409; // Conflict
      throw error;
    }

    // 3. Si pas d'inscriptions, supprimer le cours
    return await this.coursRepository.delete(id);
  }
}
