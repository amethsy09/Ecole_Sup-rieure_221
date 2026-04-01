import { BaseRepository } from './BaseRepository.js';
import database from '../config/db.js';

export default class SousClasseRepository extends BaseRepository {
  constructor() {
    super(database.getClient().sousClasse);
    this.db = database;
  }

  async findAll() {
    return this.model.findMany({
      include: {
        classe: true,
      },
      orderBy: { id: 'asc' },
    });
  }

  async findById(id) {
    return this.model.findUnique({
      where: { id: parseInt(id) },
      include: {
        classe: true,
      },
    });
  }

  async findByClasseId(classeId) {
    return this.model.findMany({
      where: { classeId: parseInt(classeId) },
      include: { classe: true },
    });
  }

  async create(data) {
    const classe = await this.db.getClient().classe.findUnique({
      where: { id: parseInt(data.classeId) },
    });

    if (!classe) {
      throw Object.assign(new Error(`Classe avec l'ID ${data.classeId} introuvable.`), { status: 404 });
    }

    const existing = await this.model.findFirst({
      where: {
        code: data.code,
        classeId: parseInt(data.classeId),
      },
    });

    if (existing) {
      throw new Error(`Sous-classe avec le code "${data.code}" existe déjà pour cette classe.`);
    }

    return this.model.create({
      data: {
        code: data.code,
        libelle: data.libelle ?? null,
        niveau: data.niveau ?? null,
        classeId: parseInt(data.classeId),
      },
      include: { classe: true },
    });
  }

  async update(id, data) {
    const sousClasseId = parseInt(id);
    const found = await this.findById(sousClasseId);
    if (!found) {
      throw Object.assign(new Error(`Sous-classe avec l'ID ${id} introuvable.`), { status: 404 });
    }

    if (data.classeId) {
      const classe = await this.db.getClient().classe.findUnique({
        where: { id: parseInt(data.classeId) },
      });
      if (!classe) {
        throw Object.assign(new Error(`Classe avec l'ID ${data.classeId} introuvable.`), { status: 404 });
      }
    }

    if (data.code || data.classeId) {
      const code = data.code ?? found.code;
      const classeId = data.classeId ? parseInt(data.classeId) : found.classeId;

      const duplicate = await this.model.findFirst({
        where: {
          code,
          classeId,
          NOT: { id: sousClasseId },
        },
      });

      if (duplicate) {
        throw new Error(`Sous-classe avec le code "${code}" existe déjà pour cette classe.`);
      }
    }

    return this.model.update({
      where: { id: sousClasseId },
      data: {
        code: data.code ?? found.code,
        libelle: data.libelle === undefined ? found.libelle : data.libelle,
        niveau: data.niveau === undefined ? found.niveau : data.niveau,
        classeId: data.classeId !== undefined ? parseInt(data.classeId) : found.classeId,
      },
      include: { classe: true },
    });
  }

  async delete(id) {
    const sousClasseId = parseInt(id);
    const found = await this.findById(sousClasseId);

    if (!found) {
      throw Object.assign(new Error(`Sous-classe avec l'ID ${id} introuvable.`), { status: 404 });
    }

    return this.model.delete({
      where: { id: sousClasseId },
    });
  }
}
