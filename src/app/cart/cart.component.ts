import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../sevices/cart.service'; //

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {
  // On récupère les items directement depuis le service
  
  items = this.cartService.getItems();

  constructor(public cartService: CartService) {}

  supprimerProduit(index: number) {
    this.items.splice(index, 1);
  }
}
