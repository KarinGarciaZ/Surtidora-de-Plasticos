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

  saveCategory(name, imageUrl) {
    let category = { name, imageUrl };
    this.db.list('/categories').push(category).then( () => window.location.reload(true));
  }  
}
