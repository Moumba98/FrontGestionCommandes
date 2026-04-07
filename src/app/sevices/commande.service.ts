import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Commande } from '../models/commande';

@Injectable({ providedIn: 'root' })
export class CommandeService {
  private apiUrl = 'http://15.188.37.53:8080/api/commandes';

  constructor(private http: HttpClient) {}

  // --- MÉTHODE POUR L'HISTORIQUE ---

  getMesCommandes(): Observable<Commande[]> {
    // Cette méthode va chercher uniquement les commandes de l'utilisateur connecté
    return this.http.get<Commande[]>(`${this.apiUrl}/mes-commandes`);
  }

  // --- LE CRUD  ---

  // Lister toutes les commandes (Admin uniquement normalement)

  getCommandes(): Observable<Commande[]> {
    return this.http.get<Commande[]>(`${this.apiUrl}/liste`);
  }

  // On utilise 'any' ou un DTO pour l'envoi car on envoie des IDs (productId, clientId)

  createCommande(commandeData: any): Observable<Commande> {
    return this.http.post<Commande>(`${this.apiUrl}/ajouter`, commandeData);
  }

  deleteCommande(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, { responseType: 'text' as 'json' });
  }

  getCommandeById(id: number): Observable<Commande> {
    return this.http.get<Commande>(`${this.apiUrl}/${id}`);
  }

  updateCommande(id: number, commande: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, commande, { responseType: 'text' as 'json' });
  }
}
