import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // INDISPENSABLE pour ngModel
import { ActivatedRoute, Router } from '@angular/router';
import { Commande } from '../models/commande';
import { Client } from '../models/clients';
import { CommandeService } from '../sevices/commande.service';
import { ClientService } from '../sevices/client.service';

@Component({
  selector: 'app-commande-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './commande-form.component.html',
  styleUrls: ['./commande-form.component.css']
})
export class CommandeFormComponent implements OnInit {

// On initialise l'objet commande selon l' entité

   commande: Commande = {
    produit: '',
    quantite: 1,
    client: { id: 0, nom: '', email: '' }
  };

  clients: Client[] = []; // Pour remplir le menu déroulant

  modeEdition = false;

  constructor(
    private commandeService: CommandeService,
    private clientService: ClientService,
    public router: Router,
    private route : ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.clientService.getClients().subscribe(data => this.clients = data);

     // on verifie si y'a un id

 const id = this.route.snapshot.params['id'];

    if (id){
      this.modeEdition = true;
      this.commandeService.getCommandeById(id).subscribe(data=>{

        this.commande =data;
      })
    }

  }



  enregistrer(): void {

  const commandePourBackend: any = {

    produit: this.commande.produit,
    quantite: this.commande.quantite,
    clientId: this.commande.client.id
  };

  if (this.modeEdition){

    this.commandeService.updateCommande(this.commande.id!, commandePourBackend).subscribe({

      next:()=> this.router.navigate(['/commandes']),
     error : (err) => console.error(err)
    });
  }else {

    this.commandeService.createCommande(commandePourBackend).subscribe({
      next: () => this.router.navigate(['/commandes'])
    })
  }

}
}
