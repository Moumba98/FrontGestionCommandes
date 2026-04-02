import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { Router } from '@angular/router';
import { CommandeService } from '../sevices/commande.service';
import { AuthService } from '../sevices/auth.service';
import { Commande } from '../models/commande';

@Component({
  selector: 'app-commande-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './commande-list.component.html',
  styleUrl: './commande-list.component.css'
})
export class CommandeListComponent implements OnInit {
  commandes: Commande[] = [];

  constructor(
    private commandeService: CommandeService,
    public authService: AuthService,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.chargerCommandes();
  }

  chargerCommandes() {
    const role = this.authService.getRole();
    if (role === 'ADMIN') {
      this.commandeService.getCommandes().subscribe(data => this.commandes = data);
    } else {
      this.commandeService.getMesCommandes().subscribe(data => this.commandes = data);
    }
  }

  supprimer(id: number) {
    if (confirm('Voulez-vous vraiment supprimer cette commande ?')) {
      this.commandeService.deleteCommande(id).subscribe({
        next: () => {
          this.commandes = this.commandes.filter(c => c.id !== id);
        },
        error: (err) => console.error(err)
      });
    }
  }
}
