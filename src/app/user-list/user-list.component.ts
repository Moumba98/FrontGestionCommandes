import { Component, OnInit } from '@angular/core';
import { AuthService } from '../sevices/auth.service';
import { User } from '../models/user';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [], // Plus besoin de CommonModule pour @for !
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent implements OnInit {

  listeUtilisateurs: User[] = [];

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.chargerUsers();
  }

  chargerUsers() {
    this.authService.getUsers().subscribe(data => {
      this.listeUtilisateurs = data;
    });
  }

  changerRole(username: string, nouveauRole: string) {
    this.authService.updateRole(username, nouveauRole).subscribe({
      next: () => {
        this.chargerUsers(); // On rafraîchit la liste
      },
      error: (err) => console.error("Erreur de rôle", err)
    });
  }

 supprimerUtilisateur(id: number) {
  if (confirm("ATTENTION : Voulez-vous vraiment supprimer cet utilisateur ? Cette action est irréversible.")) {
    this.authService.deleteUser(id).subscribe({
      next: (message) => {
        console.log(message);
        this.chargerUsers(); // On rafraîchit la liste pour faire disparaître la ligne
      },
      error: (err) => {
        console.error("Erreur lors de la suppression", err);
        alert("Impossible de supprimer l'utilisateur.");
      }
    });
  }
}
}
