import { HttpInterceptorFn } from '@angular/common/http';
import { inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const platformId = inject(PLATFORM_ID);

  // 1. On vérifie si on est dans le navigateur
  if (isPlatformBrowser(platformId)) {
    const token = localStorage.getItem('token');

    // 2. IMPORTANT : On n'ajoute le token que si ce n'est PAS une requête Stripe
    // Remplace 'stripe.com' par le test approprié
    const isStripeRequest = req.url.includes('stripe.com');

    if (token && !isStripeRequest) {
      const cloned = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
      return next(cloned);
    }
  }
  return next(req);
};
