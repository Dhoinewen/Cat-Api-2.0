import {
  createAction,
  createFeatureSelector,
  createReducer,
  createSelector,
  on,
  props,
} from '@ngrx/store';
import { ICat } from '../models/cats';
import { IBreeds } from '../models/breeds';
import { ICategories } from '../models/categories';

export const getCats = createAction(
  '[CATS] Make Request',
  props<{
    pageIndex: number;
    pageSize: number;
    breedID: string;
    format: string;
    category: number;
  }>()
);
export const getData = createAction(
  '[CATS] Get Cats Data',
  props<{ catsData: any; paginationCount: number }>()
);
export const getBreeds = createAction(
  '[CATS] Get All Breeds',
  props<{ breedsData: any }>()
);
export const getCategories = createAction(
  '[CATS] Get All Categories',
  props<{ categoriesData: any }>()
);

export const setSelectedFormat = createAction(
  '[CATS] Set Selected Format',
  props<{ format: string }>()
);
export const setPagination = createAction(
  '[CATS] Set Pagination',
  props<{ pageSize: number; pageIndex: number }>()
);
export const setPageIndex = createAction(
  '[CATS] Set Page Index',
  props<{ pageIndex: number }>()
);
export const setBreed = createAction(
  '[CATS] Set Selected Breed',
  props<{ breed: string }>()
);
export const setCategory = createAction(
  '[CATS] Set Category',
  props<{ categoryID: number }>()
);

export interface CatsState {
  cats: ICat[];
  paginationCount: number;
  breeds: IBreeds[];
  loading: boolean;
  error: string;
  categories: ICategories[];
}

export interface PaginationAndFilterState {
  pageIndex: number;
  pageSize: number;
  breed: string;
  format: string;
  category: number;
}

export const initialState: CatsState = {
  cats: [],
  paginationCount: 1000,
  breeds: [],
  loading: false,
  error: '',
  categories: [],
};

export const paginationInitialState: PaginationAndFilterState = {
  pageIndex: 0,
  pageSize: 10,
  breed: '',
  format: '',
  category: 0,
};

export const catsReducer = createReducer(
  initialState,
  on(getData, (state, { catsData, paginationCount }) => {
    return {
      ...state,
      cats: catsData,
      paginationCount: paginationCount,
      loading: false,
    };
  }),
  on(getBreeds, (state, { breedsData }) => {
    return { ...state, breeds: breedsData };
  }),
  on(getCats, (state) => {
    return { ...state, loading: true };
  }),
  on(getCategories, (state, { categoriesData }) => {
    return { ...state, categories: categoriesData };
  })
);

export const paginationReducer = createReducer(
  paginationInitialState,
  on(setPagination, (state, { pageIndex, pageSize }) => {
    return { ...state, pageSize: pageSize, pageIndex: pageIndex };
  }),
  on(setPageIndex, (state, { pageIndex }) => {
    return { ...state, pageIndex: pageIndex };
  }),
  on(setSelectedFormat, (state, { format }) => {
    return { ...state, format: format, pageIndex: 0 };
  }),
  on(setBreed, (state, { breed }) => {
    return { ...state, breed: breed, pageIndex: 0 };
  }),
  on(setCategory, (state, { categoryID }) => {
    return { ...state, category: categoryID, pageIndex: 0 };
  })
);

export const featureSelector = createFeatureSelector<CatsState>('cat');
export const featurePaginationSelector =
  createFeatureSelector<PaginationAndFilterState>('pagination');

export const catsSelector = createSelector(
  featureSelector,
  (state) => state.cats
);

export const paginationCountSelector = createSelector(
  featureSelector,
  (state) => state.paginationCount
);

export const breedsSelector = createSelector(
  featureSelector,
  (state) => state.breeds
);

export const categoriesSelector = createSelector(
  featureSelector,
  (state) => state.categories
);

export const loadingSelector = createSelector(
  featureSelector,
  (state) => state.loading
);

export const paginationSelector = createSelector(
  featurePaginationSelector,
  (state) => state
);

export const pageSizeSelector = createSelector(
  featurePaginationSelector,
  (state) => state.pageSize
);

export const pageIndexSelector = createSelector(
  featurePaginationSelector,
  state => state.pageIndex
)
