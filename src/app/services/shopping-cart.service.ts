import { Observable } from 'rxjs/Observable';
import { ShoppingCart } from './../models/shopping-cart';
import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import { Product } from '../models/product';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/map';

@Injectable()
export class ShoppingCartService { 

  constructor(private db: AngularFireDatabase) {     
  }

  private create() {
    return this.db.list('/shopping-carts').push({
      dateCreated: new Date().getTime()
    });
  }

  private async getOrCreateCart(): Promise<string> {
    let cartId = localStorage.getItem('cartId');
    if (cartId) return cartId;
     
    let res = await this.create();
    localStorage.setItem('cartId', res.key);
    return res.key;          
  }

  async getCart(): Promise<Observable<ShoppingCart>> {
    let cartId = await this.getOrCreateCart();
    return this.db.object('/shopping-carts/' + cartId)
    .map( x => new ShoppingCart(x.items));
  }

  private getItem(cartId: string, productId: string) {
    return this.db.object('/shopping-carts/' + cartId + '/items/' + productId);
  }

  async addToCart(product: Product) {
   this.updateItems(product, 1);
  }

  async removeItem(product: Product) {
    this.updateItems(product, -1);
  }

  private async updateItems( product: Product, change: number ) {
    let cartId = await this.getOrCreateCart();
    let item$ = this.getItem(cartId, product.$key);
    item$.take(1).subscribe( item => {
      item$.update({ product: product, quantity: (item.quantity || 0) + change });
    });
  }
}
