import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CommandeService } from '../sevices/commande.service';
import { AuthService } from '../sevices/auth.service';
import { Commande } from '../models/commande';

@Component({
  selector: 'app-commande-list',
  standalone: true,
  imports: [CommonModule], // Plus besoin de DatePipe ici
  templateUrl: './commande-list.component.html',
  styleUrls: ['./commande-list.component.css']
})
export class CommandeListComponent implements OnInit {
  commandes: Commande[] = [];

  constructor(
    public commandeService: CommandeService,
    public authService: AuthService,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.chargerCommandes();
  }

  chargerCommandes(): void {
    this.commandeService.getCommandes().subscribe({
      next: (data) => this.commandes = data,
      error: (err) => console.error("Erreur lors du chargement des commandes", err)
    });
  }

  supprimer(id: number): void {
  if (confirm('Voulez-vous vraiment supprimer cette commande ?')) {
    this.commandeService.deleteCommande(id).subscribe({
      next: () => {
        // Succès : on retire la ligne visuellement
        this.commandes = this.commandes.filter(c => c.id !== id);
      },
      error: (err) => {
        // Si le serveur renvoie 200 OK mais qu'Angular râle encore
        if (err.status === 200) {
          this.commandes = this.commandes.filter(c => c.id !== id);
        } else {
          console.error("Erreur réelle :", err);
          alert("Erreur lors de la suppression (Code: " + err.status + ")");
        }
      }
    });
  }
}
}
