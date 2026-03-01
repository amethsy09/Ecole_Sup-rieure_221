import Database from "../config/db.js";
import BaseRepo from "./base.repo.js";

const db = new Database();
const prisma = db.getClient();

class EtudiantRepo extends BaseRepo {
  constructor() {
    super(prisma.etudiant);
  }

  findByEmail(email) {
    return this.model.findUnique({ where: { email } });
  }

  listAll() {
    return this.model.findMany({
      include: { classe: true },
      orderBy: { createdAt: "desc" },
    });
  }
}

const etudiantRepo = new EtudiantRepo();
export default etudiantRepo;