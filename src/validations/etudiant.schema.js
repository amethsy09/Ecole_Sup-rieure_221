import { z } from "zod";

export const createEtudiantSchema = z
  .object({
  prenom: z.string().trim().min(2, "Prenom min 2 caractères"),
  nom: z.string().trim().min(2, "Nom min 2 caractères"),
  email: z.string().trim().email("Email invalide"),
  dateNaissance: z.coerce.date(),
  classeId: z.number().int().positive("classeId invalide"),
  })
  .refine((d) => d.dateNaissance <= new Date(), {
    message: "dateNaissance ne peut pas être dans le futur",
    path: ["dateNaissance"],
  });


    // Gestionnaire d'erreurs centralisé
    this.app.use ( ( err , req , res , next ) = > {​​​     
      // Utiliser le statut/code d'erreur lorsqu'il est disponible
      const  status  =  err . status  ||  err . statusCode  ||  500 ;
      const  responseBody  =  {
        message : err . message  ||  "Erreur interne du serveur" ,
      } ;
      // Joindre les erreurs de validation ou autres erreurs structurées, le cas échéant.
      if  ( err . errors )  {
        responseBody.errors = err.errors ;​​ ​​ 
      }
      res . status ( status ) . json ( responseBody ) ;
    } ) ;
