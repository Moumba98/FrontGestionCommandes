import { Product } from './product';
import { User } from './user';

export interface Commande {
  id: number;
  reference: string;
  quantite: number;
  prixUnitaire: number;
  dateCommande: string; // ISO string reçu du Java
  product: Product;     // L'objet produit complet
  user: User;

  // juste ce dont on a besoin pour l'affichage si nécessaire
}
