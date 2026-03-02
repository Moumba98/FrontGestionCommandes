import { Injectable } from '@angular/core';
import { Product } from '../models/product';


@Injectable({
  providedIn: 'root'
})
export class CartService {
  private items: Product[] = [];

  constructor() {}
addToCart(product: Product) {
  // On cherche si le produit est déjà dans le panier
  const existingItem = this.items.find(i => i.id === product.id);

  if (existingItem) {
    // S'il existe, on augmente sa quantité
    existingItem.quantity = (existingItem.quantity || 0) + 1;
  } else {
    // S'il n'existe pas, on l'ajoute avec une quantité de 1
    this.items.push({ ...product, quantity: 1 });
  }
}

// Pour le prix total, on doit multiplier par la quantité
getTotalPrice() {
  return this.items.reduce((total, item) => total + (item.price * (item.quantity || 1)), 0);
}

  // Récupérer les articles
  getItems() {
    return this.items;
  }


  // Vider le panier
  clearCart() {
    this.items = [];
    return this.items;
  }
}
