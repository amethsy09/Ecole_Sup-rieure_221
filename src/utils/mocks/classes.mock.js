const classesMock = [
  {
    id: 1,
    code: "L3-DEV",
    libelle: "Licence 3 Developpement",
    sousClasses: [],
    anneeScolaire: "2025-2026",
    archived: false
  },
  {
    id: 2,
    code: "L2-DEV",
    libelle: "Licence 2 Developpement",
    sousClasses: ["A", "B"],
    anneeScolaire: "2025-2026",
    archived: false
  },
  {
    id: 3,
    code: "L1-DEV",
    libelle: "Licence 1 Developpement",
    sousClasses: ["Groupe 1"],
    anneeScolaire: "2025-2026",
    archived: true
  }
];

export default classesMock;
