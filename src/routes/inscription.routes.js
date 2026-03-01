import express from "express";
import inscriptionController from "../controllers/inscription.controller.js";
const router = express.Router();
//router.get('/test', inscriptionController.test);
router.get('/', inscriptionController.getAll);
router.get('/:id', inscriptionController.getById);
router.post('/', inscriptionController.create);
router.post('/reactiver', inscriptionController.reactiver);
export default router;