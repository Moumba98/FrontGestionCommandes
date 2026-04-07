import { Component, OnInit } from '@angular/core';
import { AuthService } from '../sevices/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../models/user';

@Component({
  selector: 'app-client-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './client-form.component.html',
  styleUrl: './client-form.component.css'
})
export class ClientFormComponent implements OnInit {
  client: User = {
    username: '',
    password: '',
    role: 'USER'
  };
  isEditMode = false;

  constructor(
    public authService: AuthService, // Changé en public pour être accessible partout si besoin
    public router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.isEditMode = true;
      // On utilise authService ici
      this.authService.getUsers().subscribe({
        next: (users: User[]) => {
          const found = users.find(u => u.id === +id);
          if (found) this.client = found;
        },
        error: (err: any) => console.error("Erreur lors de la récupération", err)
      });
    }
  }

  enregistrer() {
    if (this.isEditMode) {
      // Correction : on utilise authService.updateRole (puisque c'est ce que ton service propose)
      this.authService.updateRole(this.client.username, this.client.role!).subscribe({
        next: () => this.router.navigate(['/clients']),
        error: (err: any) => console.error(err)
      });
    } else {
      // Correction : on utilise authService.register pour créer un user
      this.authService.register(this.client).subscribe({
        next: () => this.router.navigate(['/clients']),
        error: (err: any) => console.error(err)
      });
    }
  }
}
