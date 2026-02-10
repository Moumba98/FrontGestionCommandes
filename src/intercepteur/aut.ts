import { HttpInterceptorFn } from '@angular/common/http';
import { inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const platformId = inject(PLATFORM_ID);

  if (isPlatformBrowser(platformId)) {
    const token = localStorage.getItem('token');

    if (token) {
      // Clone la requête pour ajouter le header Authorization
      const cloned = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}` // Vérifie bien l'espace ici
        }
      });
      return next(cloned);
    }
  }
  return next(req);
};
