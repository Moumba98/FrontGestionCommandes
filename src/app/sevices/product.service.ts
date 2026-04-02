import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'http://15.188.37.53:8080/api/products';

  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    // On dit à HttpClient que ce qu'on reçoit est un tableau de "Product"
    return this.http.get<Product[]>(this.apiUrl);
  }

  addProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.apiUrl, product);
  }

  getProductById(id: number): Observable<Product> {
    // On ajoute /id à la fin de l'URL de base
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }
}
