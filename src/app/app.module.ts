import { ShoppingCartService } from './services/shopping-cart.service';
import { BrandsService } from './services/brands.service';
import { ProductService } from './services/product.service';
import { CategoryService } from './services/category.service';
import { AdminGuardService } from './services/admin-guard.service';
import { UserService } from './services/user.service';
import { GuardService } from './services/guard.service';
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
import { DataTableModule } from 'angular-4-data-table';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FoooterComponent } from './foooter/foooter.component';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';
import { CategoriesComponent } from './categories/categories.component';
import { LoginComponent } from './login/login.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { CheckOutComponent } from './check-out/check-out.component';
import { AdminProductsComponent } from './admin/admin-products/admin-products.component';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';
import { ProductFormComponent } from './admin/product-form/product-form.component';
import { CategoriesFormComponent } from './admin/categories-form/categories-form.component';
import { AdminCategoriesComponent } from './admin/admin-categories/admin-categories.component';
import { AdminBrandsComponent } from './admin/admin-brands/admin-brands.component';
import { BrandsFormComponent } from './admin/brands-form/brands-form.component';
import { CustomFormsModule } from 'ng2-validation';
import { BrandsComponent } from './brands/brands.component';

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
    AdminOrdersComponent,
    ProductFormComponent,
    CategoriesFormComponent,
    AdminCategoriesComponent,
    AdminBrandsComponent,
    BrandsFormComponent,
    BrandsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    CustomFormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    DataTableModule,
    NgbModule.forRoot(),
    RouterModule.forRoot([
      { path: '', component: HomeComponent },
      { path: 'products', component: ProductsComponent },
      { path: 'categories', component: CategoriesComponent },
      { path: 'brands', component: BrandsComponent },
      { path: 'login', component: LoginComponent },

      { path: 'shopping-cart', component: ShoppingCartComponent, canActivate:[GuardService]},
      { path: 'check-out', component: CheckOutComponent, canActivate:[GuardService]},      
            
      { path: 'admin/categories', component: AdminCategoriesComponent, canActivate:[GuardService, AdminGuardService]},
      { path: 'admin/orders', component: AdminOrdersComponent, canActivate:[GuardService, AdminGuardService]},
      { path: 'admin/brands', component: AdminBrandsComponent, canActivate:[GuardService, AdminGuardService]},
      { path: 'admin/products/new', component: ProductFormComponent, canActivate:[GuardService, AdminGuardService]},
      { path: 'admin/products/:id', component: ProductFormComponent, canActivate:[GuardService, AdminGuardService]},
      { path: 'admin/products', component: AdminProductsComponent, canActivate:[GuardService, AdminGuardService]},
      { path: 'admin/brands/new', component: BrandsFormComponent, canActivate:[GuardService, AdminGuardService]},
      { path: 'admin/categories/new', component: CategoriesFormComponent, canActivate:[GuardService, AdminGuardService]},
      { path: 'admin/brands/:id', component: BrandsFormComponent, canActivate:[GuardService, AdminGuardService]},
      { path: 'admin/categories/:id', component: CategoriesFormComponent, canActivate:[GuardService, AdminGuardService]}
    ])
  ],
  providers: [
    LoginService,
    GuardService,
    UserService,
    AdminGuardService, 
    CategoryService,
    ProductService,
    ShoppingCartService,
    BrandsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
