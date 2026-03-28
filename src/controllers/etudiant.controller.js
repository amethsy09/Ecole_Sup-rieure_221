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
export const create = async (req, res) => {
  try {
    const { nom, prenom, email, dateNaissance, classeId } = req.body;

    // Validation rapide
    if (!nom || !prenom || !email || !dateNaissance || !classeId) {
      return res.status(400).json({ error: "Tous les champs obligatoires doivent être fournis." });
    }

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
      message: "Etudiant créé",
      data: etudiant,
    });
  } catch (err) {
    console.error("Error creating etudiant:", err);
    // Convertir n’importe quel objet d’erreur en string lisible
    let errorMessage = typeof err.message === "string" ? err.message : JSON.stringify(err);
    res.status(err.status || 500).json({
      error: errorMessage,
    });
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