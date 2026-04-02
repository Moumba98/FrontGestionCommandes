import { Component,OnInit } from '@angular/core';


import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../sevices/auth.service';
import { User } from '../models/user';


@Component({
  selector: 'app-client-list',
  standalone: true,
  imports: [CommonModule,RouterLink,],
  templateUrl: './client-list.component.html',
  styleUrl: './client-list.component.css'
})
export class ClientListComponent implements OnInit {
  users: User[] = [];

  constructor(
    public authService: AuthService,
    public router: Router
  ) { }

  ngOnInit(): void {
    this.chargerUtilisateurs();
  }

  chargerUtilisateurs() {
    this.authService.getUsers().subscribe({
      next: (data) => {
        this.users = data; // On remplit la liste 'users'
      },
      error: (err) => console.error('Erreur :', err)
    });
  }

  supprimer(id: number | undefined) {
    if (id && confirm('Supprimer cet utilisateur ?')) {
      this.authService.deleteUser(id).subscribe(() => {
        this.chargerUtilisateurs();
      });
    }
  }
}
