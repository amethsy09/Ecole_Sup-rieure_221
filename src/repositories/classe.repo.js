import Database from "../config/db.js";
import BaseRepo from "./base.repo.js";
import env from "../config/env.js";
import classMocks from "../utils/mocks/classes.mock.js";

const db = new Database();
const prisma = db.getClient();

class ClasseRepo extends BaseRepo {
  constructor() {
    super(prisma.classe);
  }

  async listActive() {
    if (String(env.USE_CLASS_MOCKS).toLowerCase() === "true") {
      return classMocks.filter(c => c.archived === false);
    }
    return this.model.findMany({ where: { archived: false }, orderBy: [{ anneeScolaire: "desc" }, { code: "asc" }] });
  }

  async findActiveById(id) {
    if (String(env.USE_CLASS_MOCKS).toLowerCase() === "true") {
      return classMocks.find(c => c.id === Number(id) && c.archived === false) || null;
    }
    return this.model.findFirst({ where: { id: Number(id), archived: false } });
  }
}

const classeRepo = new ClasseRepo();
export default classeRepo;