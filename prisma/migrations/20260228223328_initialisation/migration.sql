-- CreateEnum
CREATE TYPE "StatutInscription" AS ENUM ('ACTIVE', 'ANNULEE');

-- CreateTable
CREATE TABLE "classes" (
    "id" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "libelle" TEXT NOT NULL,
    "annee_scolaire" TEXT NOT NULL,
    "archived" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "classes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "etudiants" (
    "id" SERIAL NOT NULL,
    "prenom" TEXT NOT NULL,
    "nom" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "date_naissance" TIMESTAMP(3) NOT NULL,
    "classe_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "etudiants_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cours" (
    "id" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "libelle" TEXT NOT NULL,
    "coefficient" DOUBLE PRECISION NOT NULL,
    "volume_horaire" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "cours_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "inscriptions" (
    "id" SERIAL NOT NULL,
    "etudiant_id" INTEGER NOT NULL,
    "cours_id" INTEGER NOT NULL,
    "date_inscription" TIMESTAMP(3) NOT NULL,
    "statut" "StatutInscription" NOT NULL DEFAULT 'ACTIVE',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "inscriptions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "classes_code_annee_scolaire_key" ON "classes"("code", "annee_scolaire");

-- CreateIndex
CREATE UNIQUE INDEX "etudiants_email_key" ON "etudiants"("email");

-- CreateIndex
CREATE UNIQUE INDEX "cours_code_key" ON "cours"("code");

-- CreateIndex
CREATE UNIQUE INDEX "inscriptions_etudiant_id_cours_id_key" ON "inscriptions"("etudiant_id", "cours_id");

-- AddForeignKey
ALTER TABLE "etudiants" ADD CONSTRAINT "etudiants_classe_id_fkey" FOREIGN KEY ("classe_id") REFERENCES "classes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "inscriptions" ADD CONSTRAINT "inscriptions_etudiant_id_fkey" FOREIGN KEY ("etudiant_id") REFERENCES "etudiants"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "inscriptions" ADD CONSTRAINT "inscriptions_cours_id_fkey" FOREIGN KEY ("cours_id") REFERENCES "cours"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
