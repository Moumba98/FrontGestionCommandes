import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../sevices/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, RouterLink], // On importe FormsModule pour le [(ngModel)]
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  // L'objet qui va contenir les infos du formulaire
  user = {
    username: '',
    password: ''
  };

  constructor(private authService: AuthService, private router: Router) {}

  onRegister() {
    this.authService.register(this.user).subscribe({
      next: (res) => {
        alert("Compte créé avec succès ! Connectez-vous.");
        this.router.navigate(['/login']); // On redirige vers la connexion
      },
      error: (err) => {
        console.error(err);
        alert("Erreur lors de l'inscription : " + err.error);
      }
    });
  }
}
