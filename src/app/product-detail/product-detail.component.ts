import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../sevices/product.service';
import { Product } from '../models/product';
import { CartService } from '../sevices/cart.service';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  product?: Product;

  constructor(
    private route: ActivatedRoute,        // Pour lire l'ID dans l'URL
    private productService: ProductService ,// Pour appeler ton API
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    // 1. On récupère l'ID de l'URL
    const id = Number(this.route.snapshot.paramMap.get('id'));

    // 2. On fait le GET BY ID
    if (id) {
      this.productService.getProductById(id).subscribe({
        next: (data) => {
          this.product = data;
        },
        error: (err) => console.error('Produit introuvable', err)
      });
    }
  }

  // On déplace la logique du panier ici
  addToCart(product: Product) {
    this.cartService.addToCart(product);
  }
}
