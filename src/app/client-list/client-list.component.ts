import { Component,OnInit } from '@angular/core';
import { Client } from '../models/clients';
import { ClientService } from '../sevices/client.service';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../sevices/auth.service';


@Component({
  selector: 'app-client-list',
  standalone: true,
  imports: [CommonModule,RouterLink,],
  templateUrl: './client-list.component.html',
  styleUrl: './client-list.component.css'
})
export class ClientListComponent implements OnInit {
  clients: Client[] = [];

  constructor(private clientService: ClientService,
                public authService: AuthService,
                public router : Router
  ) { }

  ngOnInit(): void {
    this.chargerClients();
  }

  chargerClients() {
    this.clientService.getClients().subscribe(data => {
      this.clients = data;
    });
  }

  supprimer(id: number | undefined) {
    if (id && confirm('Supprimer ce client ?')) {
      this.clientService.deleteClient(id).subscribe(() => {
        this.chargerClients(); // Rafraîchir la liste après suppression
      });
    }
  }
}
