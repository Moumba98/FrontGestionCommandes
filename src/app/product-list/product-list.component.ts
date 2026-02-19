import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../sevices/product.service';
import { CartService } from '../sevices/cart.service';
import { Product } from '../models/product';
import { AuthService } from '../sevices/auth.service';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];

  constructor(
    private productService: ProductService,
    public authService: AuthService, // RENDRE AUTH SERVICE PUBLIC POUR LE TEMPLATE
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe({
      next: (data: Product[]) => this.products = data,
      error: (err: any) => console.error("Erreur", err)
    });
  }

  addToCart(product: Product) {
    this.cartService.addToCart(product);
  }
}
