import database from "../config/db.js";
import  BaseRepo  from "./base.repo.js";

const prisma = database.getClient();

export class EtudiantRepo extends BaseRepo {
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

  findById(id) {
    return this.model.findUnique({ where: { id: parseInt(id) } });
  }

  create(data) {
    return this.model.create({ data });
  }

  delete(id) {
    return this.model.delete({ where: { id: parseInt(id) } });
  }
}
export default new EtudiantRepo();