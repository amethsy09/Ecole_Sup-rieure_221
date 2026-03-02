import { BaseRepository } from './BaseRepository.js';
import database from '../config/db.js';

class InscriptionRepository extends BaseRepository {
  constructor() {
    super();
    this.prisma = database.getClient();
    this.model = this.prisma.inscription;
  }
  //Methodes implementées depuis BaseRepository
  async findAll(filters = {}) {
    const { etudiantId, coursId, statut } = filters;
    const where = {};
    
    if (etudiantId) where.etudiantId = parseInt(etudiantId);
    if (coursId) where.coursId = parseInt(coursId);
    if (statut) where.statut = statut;

    return this.model.findMany({
      where,
      include: {
        etudiant: {
          select: {
            id: true,
            prenom: true,
            nom: true,
            email: true,
            dateNaissance: true,
            classe: {
              select: {
                id: true,
                code: true,
                libelle: true
              }
            }
          }
        },
        cours: {
          select: {
            id: true,
            code: true,
            libelle: true,
            coefficient: true,
            volumeHoraire: true
          }
        },
      },
      orderBy: { dateInscription: 'desc' },
    });
  }
  async findById(id) {
    return this.model.findUnique({
      where: { id: parseInt(id) },
      include: {
        etudiant: {
          include: {
            classe: true
          }
        },
        cours: true
      },
    });
  }
   async create(data) {
    return this.model.create({
      data: {
        etudiantId: parseInt(data.etudiantId),
        coursId: parseInt(data.coursId),
        dateInscription: new Date(data.dateInscription),
        statut: data.statut || 'ACTIVE'
      },
      include: {
        etudiant: {
          select: {
            id: true,
            prenom: true,
            nom: true,
            email: true,
            classe: true
          } 
        },
        cours: {
          select: {
            id: true,
            code: true,
            libelle: true,
            coefficient: true,
            volumeHoraire: true
          } 
        },
      },
    });
  }

  async update(id, data) {
    return this.model.update({
      where: { id: parseInt(id) },
      data: {
        ...data,
        updatedAt: new Date()
      },
      include: {
        etudiant: { select: { prenom: true, nom: true, email: true } },
        cours: { select: { code: true, libelle: true } }
      }
    });
  }

  async delete(id) {
    return this.model.delete({
      where: { id: parseInt(id) }
    });
    }
    async findByCours(coursId, statut = null) {
    const where = { coursId: parseInt(coursId) };
    if (statut) where.statut = statut;

    return this.model.findMany({
      where,
      include: {
        etudiant: {
          include: {
            classe: true
          }
        }
      },
      orderBy: { dateInscription: 'desc' }
    });
  }
   async countActiveByCours(coursId) {
    return this.model.count({
      where: {
        coursId: parseInt(coursId),
        statut: 'ACTIVE'
      }
    });
  }
  
  async isInscriptionActive(etudiantId, coursId) {
    const inscription = await this.findByEtudiantAndCours(etudiantId, coursId);
    return inscription?.statut === 'ACTIVE';
  }
   async updateStatut(id, statut) {
    return this.update(id, { statut });
  }
  async countActiveByEtudiant(etudiantId) {
    return this.model.count({
      where: {
        etudiantId: parseInt(etudiantId),
        statut: 'ACTIVE'
      }
    });
  }
    async findByEtudiant(etudiantId, statut = null) {
    const where = { etudiantId: parseInt(etudiantId) };
    if (statut) where.statut = statut;

    return this.model.findMany({
      where,
      include: {
        cours: {
          include: {
            inscriptions: {
              where: { statut: 'ACTIVE' }
            }
          }
        }
      },
      orderBy: { dateInscription: 'desc' }
    });
  }
}
export default InscriptionRepository;
