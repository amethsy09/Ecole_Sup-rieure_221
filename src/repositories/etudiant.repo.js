import database from "../config/db.js";
import {BaseRepository} from "./BaseRepository.js";

const prisma = database.getClient();

class EtudiantRepo extends BaseRepository {

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