import { Routes } from '@angular/router';
import { ClientListComponent } from './client-list/client-list.component';
import { LoginComponent } from './login/login.component';
import { ClientFormComponent } from './client-form/client-form.component';
import { CommandeListComponent } from './commande-list/commande-list.component';
import { CommandeFormComponent } from './commande-form/commande-form.component';
import { UserListComponent } from './user-list/user-list.component';
import { RegisterComponent } from './register/register.component';
import { ProductListComponent } from './product-list/product-list.component';
import { CartComponent } from './cart/cart.component';


export const routes: Routes = [

 { path: 'login', component: LoginComponent },
 { path: 'register', component: RegisterComponent },
 { path: 'clients', component: ClientListComponent },
 { path: 'clients/ajouter', component: ClientFormComponent }, // URL : /clients/ajouter
  { path: 'clients/modifier/:id', component: ClientFormComponent }, // URL : /clients/modifier/1
  { path: 'boutique', component: ProductListComponent },
  { path: 'panier', component: CartComponent },
  { path: '', redirectTo: '/boutique', pathMatch: 'full' }, // On peut mettre la boutique par défaut
 // { path: '', redirectTo: 'login', pathMatch: 'full' },
// url commades
  { path: 'commandes', component: CommandeListComponent },
  { path: 'commandes/ajouter', component: CommandeFormComponent },
  {path: 'commandes/modifier/:id', component : CommandeFormComponent},

  { path: 'utilisateurs', component: UserListComponent }


];
