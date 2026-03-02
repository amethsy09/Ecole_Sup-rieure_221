/*import * as service from "../services/etudiant.service.js";
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
    const data = await service.deleteEtudiant(Number(req.params.id));
    return success(res, 200, "Etudiant supprimé", data);
  } catch (e) {
    next(e);
  }
};*/
import EtudiantService from "../services/etudiant.service.js";
const etudiantService = new EtudiantService();

export const create = async (req, res) => {
  try {
    const etudiant = await etudiantService.createEtudiant(req.body);
    res.status(201).json(etudiant);
  } catch (err) {
    res
      .status(err.status || 500)
      .json({ error: err.message || "Internal Server Error" });
  }
};

export const list = async (req, res) => {
  try {
    const etudiants = await etudiantService.listEtudiants();
    res.json(etudiants);
  } catch (err) {
    res
      .status(err.status || 500)
      .json({ error: err.message || "Internal Server Error" });
  }
};

export const remove = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    await etudiantService.deleteEtudiant(id);
    res.json({ message: "Étudiant supprimé avec succès" });
  } catch (err) {
    res
      .status(err.status || 500)
      .json({ error: err.message || "Internal Server Error" });
  }
};