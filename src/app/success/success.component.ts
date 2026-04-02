import { Component, OnInit } from '@angular/core';
import { CartService } from '../sevices/cart.service';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-success',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './success.component.html',
  styleUrl: './success.component.css'
})
export class SuccessComponent implements OnInit {


  constructor(private cartService: CartService) {}

  ngOnInit() {
  this.cartService.clearCart(); // On vide tout après le succès
}

}
