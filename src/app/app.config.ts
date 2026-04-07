import { ApplicationConfig } from '@angular/core';
import { provideRouter, withHashLocation } from '@angular/router';




import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from '../intercepteur/aut';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes, withHashLocation ()),

    provideHttpClient(
    withInterceptors([authInterceptor])), provideAnimationsAsync(),

  ]
};
