import SousClasseService from '../services/sousclasse.service.js';

export default class SousClasseController {
  constructor() {
    this.sousClasseService = new SousClasseService();
  }

  async getAllSousClasses(req, res) {
    try {
      const data = await this.sousClasseService.getAllSousClasses();
      res.status(200).json(data);
    } catch (error) {
      res.status(error.statusCode || 500).json({ error: error.message });
    }
  }

  async getSousClasseById(req, res) {
    try {
      const { id } = req.params;
      const data = await this.sousClasseService.getSousClasseById(id);
      res.status(200).json(data);
    } catch (error) {
      res.status(error.statusCode || 500).json({ error: error.message });
    }
  }

  async createSousClasse(req, res) {
    try {
      const newItem = await this.sousClasseService.createSousClasse(req.body);
      res.status(201).json(newItem);
    } catch (error) {
      res.status(error.statusCode || 400).json({ error: error.message });
    }
  }

  async updateSousClasse(req, res) {
    try {
      const { id } = req.params;
      const updatedItem = await this.sousClasseService.updateSousClasse(id, req.body);
      res.status(200).json(updatedItem);
    } catch (error) {
      res.status(error.statusCode || 400).json({ error: error.message });
    }
  }

  async deleteSousClasse(req, res) {
    try {
      const { id } = req.params;
      await this.sousClasseService.deleteSousClasse(id);
      res.status(200).json({ message: 'Sous-classe supprimée avec succès.' });
    } catch (error) {
      res.status(error.statusCode || 400).json({ error: error.message });
    }
  }
}
