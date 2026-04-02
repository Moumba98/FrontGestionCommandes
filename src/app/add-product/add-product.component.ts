import { Component } from '@angular/core';
import { Product } from '../models/product';
import { ProductService } from '../sevices/product.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatSelectModule, FormsModule],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css'
})
export class AddProductComponent {
  newProduct: Product = {
    name: '',
    description: '',
    price: 0,
    imageUrl: '',
    stockQuantity: 0,
    category: ''
  };

  successMessage: string = '';

  constructor(private productService: ProductService) {}

  onAddProduct() {
    this.productService.addProduct(this.newProduct).subscribe({
      next: (res) => {
        this.successMessage = "Produit ajouté avec succès !";
        // Reset du formulaire
        this.newProduct = { name: '', description: '', price: 0, imageUrl: '', stockQuantity: 0, category: '' };
      },
      error: (err) => console.error(err)
    });
  }
}
