export interface Product {
  id?: number;          // Le ? signifie que l'ID est optionnel (car absent lors de la création)
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  stockQuantity: number;
  category: string;
  quantity?: number;
}
