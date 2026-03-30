/*
  Warnings:

  - A unique constraint covering the columns `[code,annee_scolaire,sous_classe]` on the table `classes` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[matricule]` on the table `etudiants` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `matricule` to the `etudiants` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "classes_code_annee_scolaire_key";

-- AlterTable
ALTER TABLE "classes" ADD COLUMN     "sous_classe" TEXT DEFAULT '';

-- AlterTable
ALTER TABLE "etudiants" ADD COLUMN IF NOT EXISTS "matricule" TEXT NOT NULL DEFAULT '';
ALTER TABLE "etudiants" ALTER COLUMN "matricule" DROP DEFAULT;
-- CreateIndex
CREATE UNIQUE INDEX "classes_code_annee_scolaire_sous_classe_key" ON "classes"("code", "annee_scolaire", "sous_classe");

-- CreateIndex
CREATE UNIQUE INDEX "etudiants_matricule_key" ON "etudiants"("matricule");
