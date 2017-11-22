import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import { Product } from '../models/product';
import 'rxjs/add/operator/take';

@Injectable()
export class ShoppingCartService {

  constructor(private db: AngularFireDatabase) { }

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

  async getCart() {
    let cartId = await this.getOrCreateCart();
    return this.db.object('/shopping-carts/' + cartId);
  }

  private getItem(cartId: string, productId: string) {
    return this.db.object('/shopping-carts/' + cartId + '/items/' + productId);
  }

  async addToCart(product: Product) {
    let cartId = await this.getOrCreateCart();
    let item$ = this.getItem(cartId, product.$key);
    item$.take(1).subscribe( item => {
      item$.update({ product: product, quantity: (item.quantity || 0) + 1 });
    });
  }
}
