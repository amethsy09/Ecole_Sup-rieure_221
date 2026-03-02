/*import etudiantRepo from "../repositories/etudiant.repo.js";
import classeRepository from "../repositories/classe.repo.js";
import inscriptionRepo from "../repositories/inscription.repo.js"; // utilisé pour la suppression protégée

const error = (status, message, details = null) => ({ status, message, details });

export const createEtudiant = async (payload) => {
  // 1) classeId doit exister et non archivée (archived=false)
  const classe = await classeRepo.findFirst({ id: payload.classeId, archived: false });
  if (!classe) throw error(400, "classeId n'existe pas (ou classe archivée)");

  // 2) email unique (check logique avant erreur Prisma)
  const existing = await etudiantRepo.findByEmail(payload.email);
  if (existing) throw error(409, "Email déjà utilisé");

  // 3) créer
  return etudiantRepo.create(payload);
};

export const listEtudiants = async () => {
  return etudiantRepo.listAll();
};

export const deleteEtudiant = async (id) => {
  const etu = await etudiantRepo.findById(id);
  if (!etu) throw error(404, "Etudiant introuvable");

  // Vérifier inscriptions (Dev4)
  const nb = await inscriptionRepo.count({ etudiantId: id });
  if (nb > 0) throw error(409, "Suppression interdite: l'étudiant a des inscriptions");

  return etudiantRepo.delete(id);
};*/
import etudiantRepo from "../repositories/etudiant.repo.js";
import ClasseRepository from "../repositories/classe.repo.js";
import inscriptionRepo from "../repositories/inscription.repo.js"; // pour suppression protégée

const error = (status, message, details = null) => ({ status, message, details });

export default class EtudiantService {
  constructor() {
    this.etudiantRepo = etudiantRepo;
    this.classeRepo = new ClasseRepository(); // attention à l'instanciation
  }

  // Création d'un étudiant
  async createEtudiant(payload) {
    // 1️⃣ Vérifier que la classe existe et n'est pas archivée
    const classe = await this.classeRepo.findById(payload.classeId);
    if (!classe || classe.archived) {
      throw error(400, "Classe inexistante ou archivée");
    }

    // 2️⃣ Vérifier unicité email
    const existing = await this.etudiantRepo.findByEmail(payload.email);
    if (existing) {
      throw error(409, "Email déjà utilisé");
    }

    // 3️⃣ Créer l'étudiant
    return this.etudiantRepo.create(payload);
  }

  // Liste de tous les étudiants
  async listEtudiants() {
    return this.etudiantRepo.listAll();
  }

  // Suppression protégée
 async deleteEtudiant(id) {
  const etu = await this.etudiantRepo.findById(id);
  if (!etu) throw error(404, "Étudiant introuvable");

  // Vérifier TOUTES les inscriptions (conformément à la règle)
  const totalInscriptions = await inscriptionRepo.countAllByEtudiant(id);
  
  if (totalInscriptions > 0) {
    throw error(409,
      `Suppression impossible : cet étudiant est inscrit à ${totalInscriptions} cours. ` +
      `Veuillez d'abord supprimer ses inscriptions.`
    );
  }

  // Aucune inscription → suppression autorisée
  return this.etudiantRepo.delete(id);
}
}