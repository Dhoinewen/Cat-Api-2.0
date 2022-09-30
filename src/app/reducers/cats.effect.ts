import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, map, mergeMap} from 'rxjs/operators';
import {CatsService} from "../services/cats.service";
import {getData, getCats, getBreeds, getCategories} from "./cats";

@Injectable()
export class CatsEffects {

  loadCats$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getCats),
      mergeMap(action =>
        this.catsService.getCats(action.pageSize, action.pageIndex, action.breedID, action.format, action.category).pipe(
          map((cats) => {
            let paginationCount: number = 100
            let paginationCountResponse = cats.headers.get('pagination-count')
            if (paginationCountResponse != null) {
              paginationCount = parseInt(paginationCountResponse, 10)
            }
            return getData({catsData: cats.body, paginationCount: paginationCount});
          }),
        )
      )
    )
  );

  loadBreeds$ = createEffect(() => this.actions$.pipe(
    ofType('[Breeds] Load Breeds'),
    mergeMap(() => this.catsService.getAllBreeds().pipe(
      map(breeds => {
        return getBreeds({breedsData: breeds})
      })
    ))
  ))

  loadCategories$ = createEffect(() => this.actions$.pipe(
    ofType('[Categories] Load Categories'),
    mergeMap(() => this.catsService.getAllCategories().pipe(
      map(categories => {
        return getCategories({categoriesData: categories})
      })
    ))
  ))

  constructor(private actions$: Actions, private catsService: CatsService) {
  }

}
