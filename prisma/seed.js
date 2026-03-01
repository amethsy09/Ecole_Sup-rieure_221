import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const classes = [
  { code: "L1-INFO", libelle: "Licence 1 Informatique", anneeScolaire: "2025-2026" },
  { code: "L2-INFO", libelle: "Licence 2 Informatique", anneeScolaire: "2025-2026" },
  { code: "L3-INFO", libelle: "Licence 3 Informatique", anneeScolaire: "2025-2026" },
  { code: "M1-INFO", libelle: "Master 1 Informatique", anneeScolaire: "2025-2026" },
  { code: "M2-INFO", libelle: "Master 2 Informatique", anneeScolaire: "2025-2026" },
  { code: "L1-GESTION", libelle: "Licence 1 Gestion", anneeScolaire: "2025-2026" },
  { code: "L2-GESTION", libelle: "Licence 2 Gestion", anneeScolaire: "2025-2026" },
  { code: "L1-INFO", libelle: "Licence 1 Informatique", anneeScolaire: "2024-2025" },
  { code: "L2-INFO", libelle: "Licence 2 Informatique", anneeScolaire: "2024-2025" },
];

async function main() {
  console.log(" Seed des classes en cours...\n");

  const results = [];

  for (const c of classes) {
    const existing = await prisma.classe.findFirst({
      where: { code: c.code, anneeScolaire: c.anneeScolaire },
    });

    if (existing) {
      console.log(`  Existe déjà : ${c.code} (${c.anneeScolaire}) → ID: ${existing.id}`);
      results.push(existing);
    } else {
      const created = await prisma.classe.create({ data: c });
      console.log(` Créé : ${created.code} (${created.anneeScolaire}) → ID: ${created.id}`);
      results.push(created);
    }
  }

  console.log("\n Table des classes (pour les autres devs) :");
  console.table(results.map((c) => ({ ID: c.id, Code: c.code, Libelle: c.libelle, Annee: c.anneeScolaire })));
}

main()
  .catch((e) => {
    console.error("Erreur seed :", e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());