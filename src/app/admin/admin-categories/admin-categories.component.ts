import { CategoryService } from './../../services/category.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-categories',
  templateUrl: './admin-categories.component.html',
  styleUrls: ['./admin-categories.component.css']
})
export class AdminCategoriesComponent implements OnInit {
  categories$;
  constructor( private categoryService: CategoryService) {
    this.categories$ = this.categoryService.getAll();
   }

  ngOnInit() {
  }

  delete( id ) {
    if ( confirm('¿Estás seguro que deseas eliminar la categoría?')) {
      this.categoryService.delete(id);
      window.location.reload(true);
    }
  }

}
