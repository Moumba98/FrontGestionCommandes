import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Commande } from '../models/commande';


@Injectable({ providedIn: 'root' })
export class CommandeService {
  private apiUrl = 'http://localhost:8080/api/commandes';

  constructor(private http: HttpClient) {}

  getCommandes(): Observable<Commande[]> {
    return this.http.get<Commande[]>(`${this.apiUrl}/liste`);
  }

  createCommande(commande: Commande): Observable<Commande> {
    return this.http.post<Commande>(`${this.apiUrl}/ajouter`, commande);
  }

  deleteCommande(id: number): Observable<any> {
  // On ajoute le responseType: 'text'
  return this.http.delete(`${this.apiUrl}/${id}`, { responseType: 'text' as 'json' });
}

getCommandeById(id: number): Observable<Commande> {
  return this.http.get<Commande>(`${this.apiUrl}/${id}`);
}

updateCommande(id: number, commande: any): Observable<any> {
  return this.http.put(`${this.apiUrl}/${id}`, commande, { responseType: 'text' as 'json' });
}

}
