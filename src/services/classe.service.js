import classeRepo from "../dépôts/classe.repo.js";

// Créer une classe
export async function createClasse(data) {
  // Vérifier unicité (code + anneeScolaire)
  const existing = await classeRepo.findByCodeAndAnnee(data.code, data.anneeScolaire);
  if (existing) {
    const error = new Error(`Une classe avec le code "${data.code}" existe déjà pour l'année ${data.anneeScolaire}.`);
    error.statusCode = 409;
    throw error;
  }
  return await classeRepo.create(data);
}

// Lister toutes les classes
export async function getAllClasses(includeArchived = false) {
  return await classeRepo.findAllWithCount(includeArchived);
}

// Obtenir une classe par ID
export async function getClasseById(id) {
  const classe = await classeRepo.findByIdWithEtudiants(id);
  if (!classe) {
    const error = new Error(`Classe avec l'ID ${id} introuvable.`);
    error.statusCode = 404;
    throw error;
  }
  return classe;
}

// Modifier une classe
export async function updateClasse(id, data) {
  const classe = await classeRepo.findById(id);
  if (!classe) {
    const error = new Error(`Classe avec l'ID ${id} introuvable.`);
    error.statusCode = 404;
    throw error;
  }

  // Vérifier unicité si code ou anneeScolaire changent
  const newCode = data.code || classe.code;
  const newAnnee = data.anneeScolaire || classe.anneeScolaire;
  if (data.code || data.anneeScolaire) {
    const existing = await classeRepo.findByCodeAndAnnee(newCode, newAnnee, id);
    if (existing) {
      const error = new Error(`Une classe avec le code "${newCode}" existe déjà pour l'année ${newAnnee}.`);
      error.statusCode = 409;
      throw error;
    }
  }

  return await classeRepo.update(id, data);
}

// Archiver une classe (soft delete)
export async function archiveClasse(id) {
  const classe = await classeRepo.findByIdWithEtudiants(id);
  if (!classe) {
    const error = new Error(`Classe avec l'ID ${id} introuvable.`);
    error.statusCode = 404;
    throw error;
  }
  if (classe._count.etudiants > 0) {
    const error = new Error(`Impossible d'archiver : ${classe._count.etudiants} étudiant(s) sont inscrits dans cette classe.`);
    error.statusCode = 409;
    throw error;
  }
  return await classeRepo.archive(id);
}

// Supprimer définitivement une classe
export async function deleteClasse(id) {
  const classe = await classeRepo.findByIdWithEtudiants(id);
  if (!classe) {
    const error = new Error(`Classe avec l'ID ${id} introuvable.`);
    error.statusCode = 404;
    throw error;
  }
  if (classe._count.etudiants > 0) {
    const error = new Error(`Impossible de supprimer : ${classe._count.etudiants} étudiant(s) sont inscrits dans cette classe.`);
    error.statusCode = 409;
    throw error;
  }
  return await classeRepo.delete(id);
}