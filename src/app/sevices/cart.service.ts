import { Injectable } from '@angular/core';
import { Product } from '../models/product';


@Injectable({
  providedIn: 'root'
})
export class CartService {
  private items: Product[] = [];

  constructor() {}

  // Ajouter au panier
  addToCart(product: Product) {
    this.items.push(product);
    console.log("Produit ajouté : ", product.name);
  }

  // Récupérer les articles
  getItems() {
    return this.items;
  }

  // Calculer le prix total
  getTotalPrice() {
    return this.items.reduce((total, item) => total + item.price, 0);
  }

  // Vider le panier
  clearCart() {
    this.items = [];
    return this.items;
  }
}
