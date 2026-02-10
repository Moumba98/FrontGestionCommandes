import { Commande } from "./commande";

export interface Client {
  id?: number;
  nom: string;
  email: string;
  commandes?: Commande[];
}
