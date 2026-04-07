import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CartService } from '../sevices/cart.service';
// Angular Material
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { StripeService } from '../sevices/stripe.service';
import { loadStripe, Stripe, StripeElements } from '@stripe/stripe-js';
import { Router } from '@angular/router';
import { CommandeService } from '../sevices/commande.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterLink, MatTableModule, MatButtonModule, MatIconModule, MatCardModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {
  displayedColumns: string[] = ['image', 'name', 'price', 'quantity', 'total', 'actions'];
  clientSecret: string | null = null;
  stripe: Stripe | null = null;
  elements: StripeElements | null = null;

  constructor(
    public cartService: CartService,
    private stripeService: StripeService,
    private router: Router,
    private commandeService: CommandeService
  ) {}

  async ngOnInit() {
    this.stripe = await loadStripe('pk_test_51T9SMvCsZKlZujke3SDZyjglGN4CNBIsCoKC3hN0V4GFhOaJddvPqKCAKwpMRZHqbJl7qZOzOkwJlKzaqRQs1Dne00FhrBgm0s');
  }

  get dataSource() { return this.cartService.getItems(); }
  increment(product: any) { this.cartService.addToCart(product); }
  decrement(product: any) { this.cartService.removeFromCart(product); }
  supprimer(product: any) { }

  preparePayment() {
    const total = this.cartService.getTotalPrice();
    if (total > 0) {
      this.stripeService.createPaymentIntent(total).subscribe({
        next: async (response) => {
          this.clientSecret = response.clientSecret;
          if (this.stripe && this.clientSecret) {
            this.elements = this.stripe.elements({ clientSecret: this.clientSecret });
            const paymentElement = this.elements.create('payment');
            setTimeout(() => { paymentElement.mount('#payment-element'); }, 0);
          }
        },
        error: (err) => console.error("Erreur :", err)
      });
    }
  }

  async confirmPayment() {
    if (this.stripe && this.elements) {
      const { error, paymentIntent } = await this.stripe.confirmPayment({
        elements: this.elements,
        redirect: 'if_required',
      });

      if (error) {
        alert("Erreur StripEe : " + error.message);
      } else if (paymentIntent && paymentIntent.status === 'succeeded') {
        console.log("Paiement Stripe réussi !");
        this.saveOrderAfterPayment();
      }
    }
  }

 saveOrderAfterPayment() {
  const items = this.cartService.getItems();
  let requestsCount = 0;

  // 1. Récupère le vrai ID du client (par exemple depuis ton localStorage ou un service Auth)
  const idClientConnecte = 2; // Remplace par la vraie variable si tu en as une

  items.forEach(item => {

    const commandeDto = {
      productId: item.id,     // L'id du produit
      clientId: idClientConnecte, // L'id de l'utilisateur qui achète
      quantite: item.quantity
    };

    this.commandeService.createCommande(commandeDto).subscribe({
      next: () => {
        requestsCount++;
        // On vérifie si c'est le dernier article de la boucle
        if (requestsCount === items.length) {
          this.cartService.clearCart();
          alert("Paiement réussi et commande enregistrée !");
          this.router.navigate(['/success']);
        }
      },
      error: (err) => {
        console.error("Erreur BDD pour le produit " + item.id, err);
        // Optionnel : même si un produit échoue, on continue pour les autres
        requestsCount++;
      }
    });
  });
}

} //
