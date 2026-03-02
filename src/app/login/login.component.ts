import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthResponse } from '../models/auth';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../sevices/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  credentials = { username: '', password: '' };
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  onLogin() {
    this.authService.login(this.credentials).subscribe({
      next: () => this.router.navigate(['/boutique']), // Redirige vers la boutique après connexion
      error: () => this.errorMessage = "Identifiants incorrects"
    });
    console.log("Objet envoyé au Backend :", JSON.stringify(this.credentials));
  }
}
