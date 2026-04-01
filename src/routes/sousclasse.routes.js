import express from 'express';
import validate from '../middlewares/validate.js';
import {
  createSousClasseSchema,
  updateSousClasseSchema,
} from '../validations/sousclasse.schema.js';
import SousClasseController from '../controllers/sousclasse.controller.js';

export default class SousClasseRoute {
  constructor() {
    this.router = express.Router();
    this.controller = new SousClasseController();
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.get('/', this.controller.getAllSousClasses.bind(this.controller));
    this.router.get('/:id', this.controller.getSousClasseById.bind(this.controller));
    this.router.post('/', validate(createSousClasseSchema), this.controller.createSousClasse.bind(this.controller));
    this.router.put('/:id', validate(updateSousClasseSchema), this.controller.updateSousClasse.bind(this.controller));
    this.router.delete('/:id', this.controller.deleteSousClasse.bind(this.controller));
  }

  getRouter() {
    return this.router;
  }
}
