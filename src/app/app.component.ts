import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  breedsSelector,
  setBreed,
  categoriesSelector,
  setCategory,
} from './reducers/cats';
import { IBreeds } from './models/breeds';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  categories$ = this.store.select(categoriesSelector);
  breeds$ = this.store.select(breedsSelector);

  filteredBreeds$: Observable<IBreeds[]>;

  constructor(private store: Store) {}

  ngOnInit(): void {}

  dispatchCategory(categoryID: number): void {
    this.store.dispatch(setCategory({ categoryID: categoryID }));
  }

  dispatchBreed(breedID: string): void {
    this.store.dispatch(setBreed({ breed: breedID }));
  }
}
