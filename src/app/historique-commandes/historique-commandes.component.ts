import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommandeService } from '../sevices/commande.service';
import { Commande } from '../models/commande';

@Component({
  selector: 'app-historique-commandes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './historique-commandes.component.html',
  styleUrl: './historique-commandes.component.css'
})
export class HistoriqueCommandesComponent implements OnInit {
  mesCommandes: Commande[] = [];
  chargement = true;

  constructor(private commandeService: CommandeService) {}

  ngOnInit(): void {
    this.commandeService.getMesCommandes().subscribe({
      next: (data) => {
        this.mesCommandes = data;
        this.chargement = false;
      },
      error: (err) => {
        console.error('Erreur :', err);
        this.chargement = false;
      }
    });
  }
}
