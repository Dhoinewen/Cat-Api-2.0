import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import {catsReducer, CatsState, paginationReducer, PaginationAndFilterState} from "./cats";


export interface State {
  cat: CatsState,
  pagination: PaginationAndFilterState,
}

export const reducers: ActionReducerMap<State> = {
  cat: catsReducer,
  pagination: paginationReducer,
};


export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
