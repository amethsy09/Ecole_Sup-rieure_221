import database from '../config/db.js';
import { BaseRepository } from './BaseRepository.js';

export default class ClasseRepository extends BaseRepository {
  constructor() {
    super(database.getClient().classe);
    this.db = database;
  }

  normalizeSousClasse(value) {
    if (value === undefined || value === null) return '';
    if (typeof value !== 'string') {
      throw new Error('La sous-classe doit etre une chaine de caracteres.');
    }
    return value.trim();
  }

  normalizeSousClasses(values) {
    if (values === undefined || values === null) return [];
    if (!Array.isArray(values)) {
      throw new Error('Le champ sousClasses doit etre un tableau.');
    }

    const normalized = values.map((value) => {
      if (typeof value === 'string') {
        const clean = value.trim();
        if (!clean) {
          throw new Error('Une sous-classe ne peut pas etre vide.');
        }
        return { code: clean, niveau: null };
      } else if (typeof value === 'object' && value !== null) {
        if (!value.code || typeof value.code !== 'string' || value.code.trim() === '') {
          throw new Error('Le code de la sous-classe est obligatoire.');
        }
        const niveau = value.niveau !== undefined ? value.niveau : null;
        if (niveau !== null && (!Number.isInteger(niveau) || niveau < 1)) {
          throw new Error('Le niveau de la sous-classe doit etre un entier positif ou null.');
        }
        return { code: value.code.trim(), niveau };
      } else {
        throw new Error('Chaque sous-classe doit etre une chaine ou un objet avec code et niveau.');
      }
    });

    const codes = normalized.map(s => s.code);
    if (new Set(codes).size !== codes.length) {
      throw new Error('La liste des sous-classes contient des doublons.');
    }

    return normalized;
  }

  // Compatibilite: accepte soit sousClasses (array), soit sousClasse (string)
  extractSousClasses(data) {
    if (data.sousClasses !== undefined) {
      return this.normalizeSousClasses(data.sousClasses);
    }

    if (data.sousClasse !== undefined) {
      const one = this.normalizeSousClasse(data.sousClasse);
      return one ? [{ code: one, niveau: null }] : [];
    }

    return undefined;
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
        throw new Error("L'annee scolaire doit etre au format YYYY-YYYY (ex: 2025-2026).");
      }
    }

    if (data.niveau !== undefined) {
      if (data.niveau !== null && (!Number.isInteger(data.niveau) || data.niveau < 1)) {
        throw new Error('Le niveau doit etre un entier positif.');
      }
    }

    // Validation des sous-classes si presentes
    this.extractSousClasses(data);
  }

  async findAll() {
    return await this.model.findMany({
      include: {
        sousClasses: true,
        _count: { select: { etudiants: true, sousClasses: true } }
      }
    });
  }

  async findById(id) {
    return await this.model.findUnique({
      where: { id: parseInt(id) },
      include: {
        sousClasses: true,
        _count: { select: { etudiants: true, sousClasses: true } }
      }
    });
  }

  async create(data) {
    this.validateClasse(data);

    const sousClasses = this.extractSousClasses(data) ?? [];

    const existing = await this.model.findFirst({
      where: { code: data.code, anneeScolaire: data.anneeScolaire }
    });

    if (existing) {
      throw new Error(`Une classe avec le code "${data.code}" existe deja pour l'annee ${data.anneeScolaire}.`);
    }

    const { sousClasse, sousClasses: ignoredSousClasses, ...classeData } = data;

    return await this.model.create({
      data: {
        ...classeData,
        sousClasses: sousClasses.length
          ? { create: sousClasses.map((sc) => ({ code: sc.code, niveau: sc.niveau })) }
          : undefined
      },
      include: {
        sousClasses: true,
        _count: { select: { etudiants: true, sousClasses: true } }
      }
    });
  }

  async update(id, data) {
    this.validateClasse(data);

    const classId = parseInt(id);
    const classe = await this.findById(classId);
    if (!classe) {
      throw new Error(`Classe avec l'ID ${id} introuvable.`);
    }

    if (data.code || data.anneeScolaire) {
      const newCode = data.code || classe.code;
      const newAnnee = data.anneeScolaire || classe.anneeScolaire;

      const existing = await this.model.findFirst({
        where: {
          code: newCode,
          anneeScolaire: newAnnee,
          NOT: { id: classId }
        }
      });

      if (existing) {
        throw new Error(`Une classe avec le code "${newCode}" existe deja pour l'annee ${newAnnee}.`);
      }
    }

    const sousClassesProvided = data.sousClasses !== undefined || data.sousClasse !== undefined;
    const normalizedSousClasses = sousClassesProvided ? this.extractSousClasses(data) : undefined;

    const { sousClasse, sousClasses, ...classeData } = data;
    const hasClasseData = Object.keys(classeData).length > 0;

    return await this.db.getClient().$transaction(async (tx) => {
      if (hasClasseData) {
        await tx.classe.update({
          where: { id: classId },
          data: classeData
        });
      }

      if (sousClassesProvided) {
        await tx.sousClasse.deleteMany({ where: { classeId: classId } });

        if (normalizedSousClasses.length) {
          await tx.sousClasse.createMany({
            data: normalizedSousClasses.map((sc) => ({ code: sc.code, niveau: sc.niveau, classeId: classId }))
          });
        }
      }

      return tx.classe.findUnique({
        where: { id: classId },
        include: {
          sousClasses: true,
          _count: { select: { etudiants: true, sousClasses: true } }
        }
      });
    });
  }

  async archive(id) {
    const classId = parseInt(id);
    const classe = await this.findById(classId);

    if (classe._count.etudiants > 0) {
      throw new Error(`Impossible d'archiver : ${classe._count.etudiants} etudiant(s) sont inscrits dans cette classe.`);
    }

    return await this.model.update({
      where: { id: classId },
      data: { archived: true },
      include: {
        sousClasses: true,
        _count: { select: { etudiants: true, sousClasses: true } }
      }
    });
  }

  async findAllWithCount(includeArchived = false) {
    return await this.model.findMany({
      where: includeArchived ? {} : { archived: false },
      include: {
        sousClasses: true,
        _count: { select: { etudiants: true, sousClasses: true } }
      }
    });
  }

  async delete(id) {
    const classId = parseInt(id);
    const classe = await this.findById(classId);

    if (classe._count.etudiants > 0) {
      throw new Error(`Impossible de supprimer : ${classe._count.etudiants} etudiant(s) sont inscrits dans cette classe.`);
    }

    return await this.model.delete({
      where: { id: classId }
    });
  }
}
