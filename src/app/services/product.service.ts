import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';

@Injectable()
export class ProductService {

  constructor(private db: AngularFireDatabase) { }

  create(product){
    this.db.list('/products').push(product);
  }

  update(id, product) {
    this.db.object('/products/' + id).update(product);
  }

  getAll() {
    return this.db.list('/products');
  }

  getProduct( productId ) {
    return this.db.object('/products/' + productId);
  }

  delete( productId ) {
    this.db.object('/products/' + productId).remove();
  }
}
