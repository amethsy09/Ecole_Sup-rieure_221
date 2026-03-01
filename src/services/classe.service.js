import ClasseRepository from "../repositories/classe.repo.js";

export default class ClasseService {
  constructor() {
    this.classeRepository = new ClasseRepository();
  }

  async createClasse(data) {
    return await this.classeRepository.create(data);
  }

  async getAllClasses(includeArchived = false) {
    return await this.classeRepository.findAllWithCount(includeArchived);
  }

  async getClasseById(id) {
    const classe = await this.classeRepository.findById(id);
    if (!classe) {
      const error = new Error(`Classe avec l'ID ${id} introuvable.`);
      error.statusCode = 404;
      throw error;
    }
    return classe;
  }

  async updateClasse(id, data) {
    const classe = await this.classeRepository.findById(id);
    if (!classe) {
      const error = new Error(`Classe avec l'ID ${id} introuvable.`);
      error.statusCode = 404;
      throw error;
    }
    return await this.classeRepository.update(id, data);
  }

  async archiveClasse(id) {
    const classe = await this.classeRepository.findById(id);
    if (!classe) {
      const error = new Error(`Classe avec l'ID ${id} introuvable.`);
      error.statusCode = 404;
      throw error;
    }
    return await this.classeRepository.archive(id);
  }

  async deleteClasse(id) {
    const classe = await this.classeRepository.findById(id);
    if (!classe) {
      const error = new Error(`Classe avec l'ID ${id} introuvable.`);
      error.statusCode = 404;
      throw error;
    }
    return await this.classeRepository.delete(id);
  }
}