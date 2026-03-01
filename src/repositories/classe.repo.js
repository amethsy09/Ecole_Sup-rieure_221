import { BaseRepository } from './base.repo.js';
import { prisma } from '../config/db.js';

class ClasseRepository extends BaseRepository {
  // Implémentation de findAll
  async findAll(options = {}) {
    return await prisma.classe.findMany({
      where: { archived: false, ...options.where },
      include: options.include
    });
  }

  // Implémentation de findById
  async findById(id) {
    return await prisma.classe.findUnique({
      where: { id: parseInt(id) }
    });
  }

  // Implémentation de create
  async create(data) {
    return await prisma.classe.create({
      data: data
    });
  }

  // Méthode spécifique pour les classes: vérifier l'unicité du code et de l année
  async findByCodeAndYear(code, anneeScolaire) {
    return await prisma.classe.findUnique({
      where: {
        code_anneeScolaire: { code, anneeScolaire }
      }
    });
  }

  // Vérifier s'il y a des étudiants (pour la règle de suppression)
  async countStudents(id) {
    const classe = await prisma.classe.findUnique({
      where: { id: parseInt(id) },
      include: { _count: { select: { etudiants: true } } }
    });
    return classe?._count?.etudiants || 0;
  }

  async delete(id) {
    return await prisma.classe.delete({
      where: { id: parseInt(id) }
    });
  }
}

export default new ClasseRepository();