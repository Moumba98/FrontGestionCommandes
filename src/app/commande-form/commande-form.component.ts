import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Commande } from '../models/commande';
import { User } from '../models/user'; // On utilise User maintenant
import { CommandeService } from '../sevices/commande.service';
import { AuthService } from '../sevices/auth.service'; // Utilise ton AuthService qui a getUsers()

@Component({
  selector: 'app-commande-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './commande-form.component.html',
  styleUrls: ['./commande-form.component.css']
})
export class CommandeFormComponent implements OnInit {

  // Nouvelle structure alignée sur le Backend
  commande: any = {
    product: { id: null }, // On stocke l'ID du produit sélectionné
    quantite: 1,
    user: { id: 0 }       // Anciennement client
  };

  users: User[] = [];
  modeEdition = false;

  constructor(
    private commandeService: CommandeService,
    private authService: AuthService, // Pour lister les utilisateurs
    public router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    // On charge les utilisateurs pour le menu déroulant
    this.authService.getUsers().subscribe(data => this.users = data);

    const id = this.route.snapshot.params['id'];
    if (id) {
      this.modeEdition = true;
      this.commandeService.getCommandeById(id).subscribe(data => {
        this.commande = data;
      });
    }
  }

  enregistrer(): void {
    // On prépare le JSON exact attendu par ton CommandeDTO (productId, clientId, quantite)
    const commandePourBackend = {
      productId: this.commande.product.id,
      quantite: this.commande.quantite,
      clientId: this.commande.user.id
    };

    if (this.modeEdition) {
      this.commandeService.updateCommande(this.commande.id!, commandePourBackend).subscribe({
        next: () => this.router.navigate(['/commandes']),
        error: (err) => console.error(err)
      });
    } else {
      this.commandeService.createCommande(commandePourBackend).subscribe({
        next: () => this.router.navigate(['/commandes']),
        error: (err) => console.error(err)
      });
    }
  }
}