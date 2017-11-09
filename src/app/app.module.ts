import { UserService } from './user.service';
import { GuardService } from './guard.service';
import { LoginService } from './login/login.service';
import { environment } from './../environments/environment';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component } from '@angular/core';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { RouterModule } from'@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FoooterComponent } from './foooter/foooter.component';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';
import { CategoriesComponent } from './categories/categories.component';
import { LoginComponent } from './login/login.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { CheckOutComponent } from './check-out/check-out.component';
import { AdminProductsComponent } from './admin-products/admin-products.component';
import { AdminOrdersComponent } from './admin-orders/admin-orders.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FoooterComponent,
    HomeComponent,
    ProductsComponent,
    CategoriesComponent,
    LoginComponent,
    ShoppingCartComponent,
    CheckOutComponent,
    AdminProductsComponent,
    AdminOrdersComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    NgbModule.forRoot(),
    RouterModule.forRoot([
      { path: '', component: HomeComponent },
      { path: 'products', component: ProductsComponent },
      { path: 'categories', component: CategoriesComponent },
      { path: 'login', component: LoginComponent },

      { path: 'shopping-cart', component: ShoppingCartComponent, canActivate:[GuardService] },
      { path: 'check-out', component: CheckOutComponent, canActivate:[GuardService] },      
      { path: 'admin/products', component: AdminProductsComponent, canActivate:[GuardService] },
      { path: 'admin/orders', component: AdminOrdersComponent, canActivate:[GuardService] }
    ])
  ],
  providers: [
    LoginService,
    GuardService,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
