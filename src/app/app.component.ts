import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from './sevices/auth.service';
import { CartService } from './sevices/cart.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,RouterLink],
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
