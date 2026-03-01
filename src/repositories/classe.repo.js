import database from '../config/db.js';
import { BaseRepository } from './BaseRepository.js';

export default class ClasseRepository extends BaseRepository {
  constructor() {
    super();
    this.db = database;
    this.model = this.db.getClient().classe;
  }

  validateClasse(data) {
    if (data.code !== undefined) {
      if (!data.code || data.code.trim() === '') {
        throw new Error('Le code est obligatoire.');
      }
    }

    if (data.anneeScolaire !== undefined) {
      const anneeScolaireRegex = /^\d{4}-\d{4}$/;
      if (!anneeScolaireRegex.test(data.anneeScolaire)) {
        throw new Error('L\'année scolaire doit être au format YYYY-YYYY (ex: 2025-2026).');
      }
    }
  }

  async findAll() {
    return await this.model.findMany();
  }

  async findById(id) {
    return await this.model.findUnique({
      where: { id: parseInt(id) },
      include: { _count: { select: { etudiants: true } } }
    });
  }

  async create(data) {
    this.validateClasse(data);

    const existing = await this.model.findFirst({
      where: {
        code: data.code,
        anneeScolaire: data.anneeScolaire
      }
    });
    if (existing) {
      throw new Error(`Une classe avec le code "${data.code}" existe déjà pour l'année ${data.anneeScolaire}.`);
    }

    return await this.model.create({ data });
  }

  async update(id, data) {
    this.validateClasse(data);

    if (data.code || data.anneeScolaire) {
      const classe = await this.findById(id);
      const newCode = data.code || classe.code;
      const newAnnee = data.anneeScolaire || classe.anneeScolaire;

      const existing = await this.model.findFirst({
        where: {
          code: newCode,
          anneeScolaire: newAnnee,
          NOT: { id: parseInt(id) }
        }
      });
      if (existing) {
        throw new Error(`Une classe avec le code "${newCode}" existe déjà pour l'année ${newAnnee}.`);
      }
    }

    return await this.model.update({
      where: { id: parseInt(id) },
      data,
      include: { _count: { select: { etudiants: true } } }
    });
  }

  async archive(id) {
    const classe = await this.findById(id);
    if (classe._count.etudiants > 0) {
      throw new Error(`Impossible d'archiver : ${classe._count.etudiants} étudiant(s) sont inscrits dans cette classe.`);
    }

    return await this.model.update({
      where: { id: parseInt(id) },
      data: { archived: true },
      include: { _count: { select: { etudiants: true } } }
    });
  }

  async findAllWithCount(includeArchived = false) {
    return await this.model.findMany({
      where: includeArchived ? {} : { archived: false },
      include: { _count: { select: { etudiants: true } } }
    });
  }

  async estVide(id) {
    const classe = await this.findById(id);
    return (classe?._count?.etudiants || 0) === 0;
  }

  async delete(id) {
    const classe = await this.findById(id);
    if (classe._count.etudiants > 0) {
      throw new Error(`Impossible de supprimer : ${classe._count.etudiants} étudiant(s) sont inscrits dans cette classe.`);
    }

    return await this.model.delete({
      where: { id: parseInt(id) }
    });
  }
}
