import CoursRepository from "../repositories/cours.repo.js";

export default class CoursService {
  constructor() {
    this.coursRepository = new CoursRepository();
  }

  async createCours(data) {
    // La validation est déjà gérée par le layer repository
    return await this.coursRepository.create(data);
  }

  async updateCours(id, data) {
    return await this.coursRepository.update(id, data);
  }

  async deleteCours(id) {
    return await this.coursRepository.delete(id);
  }
}
