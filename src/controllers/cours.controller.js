import CoursRepository from "../repositories/cours.repo.js";
import CoursService from "../services/cours.service.js";

export default class CoursController {
  constructor() {
    this.coursRepository = new CoursRepository();
    this.coursService = new CoursService();
  }

  async getAllCours(req, res) {
    try {
      // Appel direct au repository comme demandé
      const cours = await this.coursRepository.findAll();
      return res.status(200).json(cours);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  async getCoursById(req, res) {
    try {
      const { id } = req.params;
      const cours = await this.coursRepository.findById(id);
      if (!cours) {
        return res.status(404).json({ message: "Cours non trouvé" });
      }
      return res.status(200).json(cours);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  async createCours(req, res) {
    try {
      // Utilisation du service pour la création
      const newCours = await this.coursService.createCours(req.body);
      return res.status(201).json(newCours);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  async updateCours(req, res) {
    try {
      const { id } = req.params;
      const updatedCours = await this.coursService.updateCours(id, req.body);
      return res.status(200).json(updatedCours);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  async deleteCours(req, res) {
    try {
      const { id } = req.params;
      await this.coursService.deleteCours(id);
      return res.status(200).json({ message: "Cours supprimé avec succès" });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}
