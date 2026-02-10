import { Component,OnInit } from '@angular/core';
import { Client } from '../models/clients';
import { ClientService } from '../sevices/client.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute,Router } from '@angular/router';


@Component({
  selector: 'app-client-form',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './client-form.component.html',
  styleUrl: './client-form.component.css'
})
export class ClientFormComponent implements OnInit {
  client: Client = { nom: '', email: '' };
  isEditMode = false;

  constructor(
    private clientService: ClientService,
  public router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.isEditMode = true;
      this.clientService.getSharedClient(id).subscribe({
        next: (data) => this.client = data,
        error: (err) => console.error("Erreur lors de la récupération", err)
      });
    }
  }

  enregistrer() {
    if (this.isEditMode) {
      this.clientService.updateClient(this.client.id!, this.client).subscribe(() => {
        this.router.navigate(['/clients']);
      });
    } else {
      this.clientService.createClient(this.client).subscribe(() => {
        this.router.navigate(['/clients']);
      });
    }
  }
}
