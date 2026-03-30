import EtudiantService from "../services/etudiant.service.js";
import cloudinary from "../config/cloudinary.js";
import { multerConfig } from "../config/multer.js";

const etudiantService = new EtudiantService();

/*export const creates = async (req, res) => {
  try {
    const etudiant = await etudiantService.createEtudiant(req.body);
    res.status(201).json(etudiant);
  } catch (err) {
    res
      .status(err.status || 500)
      .json({ error: err.message || "Internal Server Error" });
  }
};*/
export const create = async (req, res, next) => {
  try {
    const { nom, prenom, email, dateNaissance, classeId } = req.body;

    let imageUrl = null;

    // Upload Cloudinary si fichier présent
    if (req.file) {
      const result = await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          { folder: "etudiants" },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );
        uploadStream.end(req.file.buffer);
      });
      imageUrl = result.secure_url;
    }

    const etudiant = await etudiantService.createEtudiant({
      nom,
      prenom,
      email,
      dateNaissance: new Date(dateNaissance),
      classeId,
      image: imageUrl,
    });

    res.status(201).json({
      success: true,
      message: "Etudiant créé avec succès",
      data: etudiant,
    });
  } catch (err) {
    next(err);
  }
};

export const list = async (req, res, next) => {
  try {
    const etudiants = await etudiantService.listEtudiants();
    res.json({
      success: true,
      data: etudiants
    });
  } catch (err) {
    next(err);
  }
};

export const remove = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const deletedEtudiant = await etudiantService.deleteEtudiant(id);

    // Supprimer l'image de Cloudinary si elle existe
    if (deletedEtudiant && deletedEtudiant.image) {
      try {
        const publicId = deletedEtudiant.image.split("/").slice(-2).join("/").split(".")[0];
        const result = await cloudinary.uploader.destroy(publicId);
        console.log("Résultat suppression Cloudinary:", result);
      } catch (cloudErr) {
        console.error("Erreur suppression Cloudinary:", cloudErr);
      }
    }

    res.json({ 
      success: true,
      message: "Étudiant supprimé avec succès" 
    });
  } catch (err) {
    next(err);
  }
};