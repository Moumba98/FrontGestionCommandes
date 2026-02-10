
export interface AuthResponse {
  token: string;
  username: string;
  role: string; // "ROLE_ADMIN" ou "ROLE_USER" selon ce que renvoie ton Spring
}
