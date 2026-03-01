import Database from "../config/db.js";
import { BaseRepository } from "./BaseRepository.js";

export default class CoursRepository extends BaseRepository {
  constructor() {
    super();
    this.db = new Database();
    this.model = this.db.client.cours;
  }

  async findAll() {
    return await this.model.findMany();
  }

  async findById(id) {
    return await this.model.findUnique({
      where: { id: parseInt(id) },
    });
  }

  validateCours(data) {
    if (data.coefficient !== undefined) {
      if (Number(data.coefficient) <= 0) {
        throw new Error("Le coefficient doit être strictement positif (> 0).");
      }
    }

    if (data.volumeHoraire !== undefined) {
      const volume = Number(data.volumeHoraire);
      if (!Number.isInteger(volume) || volume <= 0) {
        throw new Error("Le volume horaire doit être un entier positif.");
      }
    }
  }

  async create(data) {
    this.validateCours(data);

    if (data.code) {
      const existing = await this.model.findUnique({
        where: { code: data.code },
      });
      if (existing) {
        throw new Error(`Un cours avec le code ${data.code} existe déjà.`);
      }
    }

    return await this.model.create({
      data,
    });
  }

  async update(id, data) {
    this.validateCours(data);

    if (data.code) {
      const existing = await this.model.findUnique({
        where: { code: data.code },
      });
      if (existing && existing.id !== parseInt(id)) {
        throw new Error(`Un cours avec le code ${data.code} existe déjà.`);
      }
    }

    return await this.model.update({
      where: { id: parseInt(id) },
      data,
    });
  }

  async delete(id) {
    const cours = await this.model.findUnique({
      where: { id: parseInt(id) },
      include: { inscriptions: true },
    });

    if (!cours) {
      throw new Error("Cours non trouvé.");
    }

    if (cours.inscriptions && cours.inscriptions.length > 0) {
      throw new Error(
        "Impossible de supprimer ce cours car des étudiants y sont inscrits.",
      );
    }

    return await this.model.delete({
      where: { id: parseInt(id) },
    });
  }
}
