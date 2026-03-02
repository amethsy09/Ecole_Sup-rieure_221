import etudiantRepo from "../repositories/etudiant.repo.js";
import classeRepo from "../repositories/classe.repo.js";
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
};