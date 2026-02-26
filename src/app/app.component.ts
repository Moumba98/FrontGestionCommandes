import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from './sevices/auth.service';
import { CartService } from './sevices/cart.service';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import { MatMenuModule } from '@angular/material/menu'; // Optionnel pour un menu déroulant
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,RouterLink,
 MatToolbarModule ,
 MatButtonModule,
 MatIconModule,
 MatBadgeModule ,
 MatMenuModule,
 CommonModule,
 MatToolbarModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'frontEndGestionClient';

  constructor(
    public authService: AuthService, // <--- IL DOIT ÊTRE EN PUBLIC ICI
    public cartService: CartService // <--- IL DOIT ÊTRE EN PUBLIC ICI
  ) {}


}
