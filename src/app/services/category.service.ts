import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';

@Injectable()
export class CategoryService {

  constructor(private db: AngularFireDatabase) { }

  getCategories() {
    return this.db.list('/categories', {
      query: {
        orderByChild: 'name'
      }
    });
  }

  saveCategory(name, imageUrl, web) {
    let category = { name, imageUrl, web };
    this.db.list('/categories').push(category).then( () => window.location.reload(true));
  }  
}
