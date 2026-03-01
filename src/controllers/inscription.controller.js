import InscriptionService from "../services/inscription.service.js";
class InscriptionController {
    constructor() {
        this.service = new InscriptionService();
    }
     test = async (req, res) => {
    try {
      res.json({
        success: true,
        message: "Controller fonctionne",
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  }
  
    getAll = async (req, res, next) => {
    try {
      const { etudiantId, coursId, statut } = req.query;
      const inscriptions = await this.service.getAllInscriptions({
        etudiantId,
        coursId,
        statut
      });
      
      res.json({
        success: true,
        count: inscriptions.length,
        data: inscriptions
      });
    } catch (error) {
      next(error);
    }
  };
  getById = async (req, res, next) => {
    try {
      const { id } = req.params;
      const inscription = await this.service.repository.findById(id);
      
      if (!inscription) {
        return res.status(404).json({
          success: false,
          message: 'Inscription non trouvée'
        });
      }
      
      res.json({
        success: true,
        data: inscription
      });
    } catch (error) {
      next(error);
    }
  };
  create = async (req, res, next) => {
    try {
      const result = await this.service.inscrireEtudiant(req.body);
      
      if (!result.success) {
        if (result.code === 'DOUBLON_ACTIF') {
          return res.status(409).json(result);
        } else if (result.code === 'DOUBLON_ANNULE') {
          return res.status(409).json(result);
        }
      }

      res.status(201).json({
        success: true,
        ...result
      });
    } catch (error) {
      if (error.status) {
        return res.status(error.status).json({
          success: false,
          message: error.message,
          code: error.code
        });
      }
      next(error);
    }
  };
  reactiver = async (req, res, next) => {
  try {
    const { inscriptionId } = req.body;
    const result = await this.service.reactiverInscription(inscriptionId);
    res.json(result);
  } catch (error) {
    next(error);
  }
};
}
export default new InscriptionController();