import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Client } from '../models/clients';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private baseUrl = 'http://localhost:8080/api/clients';

  constructor(private http: HttpClient) { }

  // GET /api/clients/liste
  getClients(): Observable<Client[]> {
    return this.http.get<Client[]>(`${this.baseUrl}/liste`);
  }

  // GET /api/clients/{id}
  getSharedClient(id: number): Observable<Client> {
    return this.http.get<Client>(`${this.baseUrl}/${id}`);
  }

  // POST /api/clients/ajouter
  createClient(client: Client): Observable<Client> {
    return this.http.post<Client>(`${this.baseUrl}/ajouter`, client);
  }

  // PUT /api/clients/{id}
  updateClient(id: number, client: Client): Observable<Client> {
    return this.http.put<Client>(`${this.baseUrl}/${id}`, client);
  }

  // DELETE /api/clients/{id}
  // On ajoute { responseType: 'text' } car ton Spring renvoie un String et non du JSON
  deleteClient(id: number): Observable<string> {
    return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
  }
}
