import { ProductDetailsComponent } from './components/products/product-details/product-details.component';
import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ProductsComponent } from './components/products/products.component';
import { LoginComponent } from './components/login/login.component';
import { authGuard } from './guards/authentication/auth.guard';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { ProductformComponent } from './components/products/productform/productform.component';
import { CartComponent } from './components/cart/cart.component';

export const routes: Routes =
  [

    { path: '', component: HomeComponent },
    { path: 'products', component: ProductsComponent, canActivate:[authGuard] },
    { path: 'products/:id', component: ProductDetailsComponent,canActivate:[authGuard] },
    { path: 'products/:id/edit', component: ProductformComponent, canActivate: [authGuard] },
    { path: 'login', component: LoginComponent },
    {path: 'cart',component:CartComponent},
    {path:'**',component:NotfoundComponent}
  ];
