import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { AuthResponse } from '../models/auth';
import { Router } from '@angular/router';
import { User } from '../models/user';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = 'http://localhost:8080/api/auth';

  constructor(private http: HttpClient,private router: Router) {}

  login(credentials: any): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, credentials).pipe(
      tap(response => {
        // On stocke tout dans le localStorage
        localStorage.setItem('token', response.token);
        localStorage.setItem('role', response.role);
        localStorage.setItem('username', response.username);
      })
    );
  }

  getRole(): string | null {
    return localStorage.getItem('role');
  }

isAdmin(): boolean {
  const role = localStorage.getItem('role');
  // Vérifie si ton API renvoie "ADMIN" ou "ROLE_ADMIN"
  return role === 'ROLE_ADMIN' || role === 'ADMIN';
}

  logout() {
    localStorage.clear(); // Vide le token et le rôle
    this.router.navigate(['/login']);

  }

  isLoggedIn(): boolean {
  const token = localStorage.getItem('token');
  return !!token; // Renvoie true si le token existe, false sinon
}

// Récupérer tous les utilisateurs pour l'admin

getUsers(): Observable<User[]> {
  return this.http.get<User[]>(`${this.apiUrl}/users`);
}

register(userData: any): Observable<any> {
  // Pas besoin d'envoyer le rôle, le backend s'en occupe
  return this.http.post(`${this.apiUrl}/register`, userData, { responseType: 'text' });
}

// Changer le rôle (Admin uniquement)
// On utilise les QueryParams car ton Backend utilise @RequestParam
updateRole(username: string, newRole: string): Observable<string> {
  return this.http.put(`${this.apiUrl}/change-role/${username}`, null, {
    params: { newRole: newRole },
    responseType: 'text'
  });
}

deleteUser(id: number): Observable<any> {
  return this.http.delete(`${this.apiUrl}/delete/${id}`, { responseType: 'text' as 'json' });
}


}
