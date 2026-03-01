import Database from "../config/db.js";
import BaseRepo from "./base.repo.js";

const db = new Database();
const prisma = db.getClient();

class InscriptionRepo extends BaseRepo {
  constructor() {
    super(prisma.inscription);
  }
}

const inscriptionRepo = new InscriptionRepo();
export default inscriptionRepo;
