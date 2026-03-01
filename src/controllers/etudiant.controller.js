import * as service from "../services/etudiant.service.js";
import { success } from "../utils/response.js";

export const create = async (req, res, next) => {
  try {
    const data = await service.createEtudiant(req.body);
    return success(res, 201, "Etudiant créé", data);
  } catch (e) {
    next(e);
  }
};

export const list = async (_req, res, next) => {
  try {
    const data = await service.listEtudiants();
    return success(res, 200, "Liste des étudiants", data);
  } catch (e) {
    next(e);
  }
};

export const remove = async (req, res, next) => {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({ message: "Paramètre 'id' invalide, un entier positif est requis." });
    }

    const data = await service.deleteEtudiant(id);
    return success(res, 200, "Etudiant supprimé", data);
  } catch (e) {
    next(e);
  }
};