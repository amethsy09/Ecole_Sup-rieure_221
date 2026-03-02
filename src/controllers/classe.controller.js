import ClasseService from "../services/classe.service.js";

export default class ClasseController {
  constructor() {
    this.classeService = new ClasseService();
  }

  async getAllClasses(req, res) {
    try {
      const includeArchived = req.query.archived === "true";
      const classes = await this.classeService.getAllClasses(includeArchived);
      return res.status(200).json(classes);
    } catch (error) {
      return res.status(error.statusCode || 500).json({ error: error.message });
    }
  }

  async getClasseById(req, res) {
    try {
      const { id } = req.params;
      const classe = await this.classeService.getClasseById(id);
      return res.status(200).json(classe);
    } catch (error) {
      return res.status(error.statusCode || 500).json({ error: error.message });
    }
  }

  async createClasse(req, res) {
    try {
      const newClasse = await this.classeService.createClasse(req.body);
      return res.status(201).json(newClasse);
    } catch (error) {
      return res.status(error.statusCode || 400).json({ error: error.message });
    }
  }

  async updateClasse(req, res) {
    try {
      const { id } = req.params;
      const updatedClasse = await this.classeService.updateClasse(id, req.body);
      return res.status(200).json(updatedClasse);
    } catch (error) {
      return res.status(error.statusCode || 400).json({ error: error.message });
    }
  }

  async archiveClasse(req, res) {
    try {
      const { id } = req.params;
      const classe = await this.classeService.archiveClasse(id);
      return res.status(200).json({ message: "Classe archivée avec succès.", data: classe });
    } catch (error) {
      return res.status(error.statusCode || 400).json({ error: error.message });
    }
  }

  async deleteClasse(req, res) {
    try {
      const { id } = req.params;
      await this.classeService.deleteClasse(id);
      return res.status(200).json({ message: "Classe supprimée avec succès." });
    } catch (error) {
      return res.status(error.statusCode || 400).json({ error: error.message });
    }
  }
}
 
