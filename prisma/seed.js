import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  await prisma.classe.upsert({
    where: { code_anneeScolaire: { code: "L3-DEV", anneeScolaire: "2025-2026" } },
    update: {},
    create: {
      code: "L3-DEV",
      libelle: "Licence 3 Développement",
      anneeScolaire: "2025-2026",
      archived: false,
    },
  });
  console.log("✅ Seed classes OK");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
