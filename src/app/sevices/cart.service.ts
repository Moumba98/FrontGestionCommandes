import { Injectable } from '@angular/core';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private items: any[] = []; // On utilise n'importe quel type ou une interface CartItem

  getItems() {
    return this.items;
  }

  // AJOUTER ou INCRÉMENTER
  addToCart(product: Product) {
    const existingItem = this.items.find(i => i.id === product.id);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      // On ajoute le produit avec une quantité initiale de 1
      this.items.push({ ...product, quantity: 1 });
    }
  }

  // DÉCRÉMENTER ou SUPPRIMER (La méthode qui manquait !)
  removeFromCart(product: any) {
    const index = this.items.findIndex(i => i.id === product.id);
    if (index !== -1) {
      if (this.items[index].quantity > 1) {
        this.items[index].quantity -= 1;
      } else {
        // Si la quantité tombe à 0, on retire carrément le produit
        this.items.splice(index, 1);
      }
    }
  }

  // VIDER LE PANIER
  clearCart() {
    this.items = [];
    return this.items;
  }

  // CALCULER LE TOTAL DYNAMIQUE
  getTotalPrice(): number {
    return this.items.reduce((total, item) => total + (item.price * item.quantity), 0);
  }
}
