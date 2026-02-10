export interface User {
  id: number;
  username: string;
  role: string;
  password?: string; // On le garde au cas où, mais on ne l'affichera pas tel quel
}
