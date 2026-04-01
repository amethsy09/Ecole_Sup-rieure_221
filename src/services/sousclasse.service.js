import SousClasseRepository from '../repositories/sousclasse.repo.js';

export default class SousClasseService {
  constructor() {
    this.sousClasseRepository = new SousClasseRepository();
  }

  async getAllSousClasses() {
    return await this.sousClasseRepository.findAll();
  }

  async getSousClasseById(id) {
    const item = await this.sousClasseRepository.findById(id);
    if (!item) {
      const error = new Error(`Sous-classe avec l'ID ${id} introuvable.`);
      error.statusCode = 404;
      throw error;
    }
    return item;
  }

  async createSousClasse(data) {
    return await this.sousClasseRepository.create(data);
  }

  async updateSousClasse(id, data) {
    const item = await this.sousClasseRepository.findById(id);
    if (!item) {
      const error = new Error(`Sous-classe avec l'ID ${id} introuvable.`);
      error.statusCode = 404;
      throw error;
    }
    return await this.sousClasseRepository.update(id, data);
  }

  async deleteSousClasse(id) {
    const item = await this.sousClasseRepository.findById(id);
    if (!item) {
      const error = new Error(`Sous-classe avec l'ID ${id} introuvable.`);
      error.statusCode = 404;
      throw error;
    }
    return await this.sousClasseRepository.delete(id);
  }
}
