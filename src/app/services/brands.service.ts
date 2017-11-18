import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';

@Injectable()
export class BrandsService {

  constructor(private db: AngularFireDatabase) { }

  createBrand(name, image) {
    let brand = { name, image };
    this.db.list('/brands').push(brand).then( () => window.location.reload(true));
  }

  getBrands() {
    return this.db.list('/brands', {
      query: {
        orderByChild: 'name'
      }
    });
  }

  getAll() {
    return this.db.list('/brands');
  }

  delete( id ) {
    this.db.object('/brands/' + id).remove();
  }

  getBrand ( id ) {
    return this.db.object('/brands/' + id);    
  }

  update(id, brand) {
    this.db.object('/brands/' + id).update(brand);
  }
}
