import { Client } from "./clients";

export interface Commande {
  id?: number;
  produit: string;
  quantite: number;
  client: Client; // Doit contenir id, nom, email
}

export interface CommandeCreateDTO {
  produit: string;
  quantite: number;
  clientId: number;
}
