import { Component, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  catsSelector,
  getCats,
  loadingSelector,
  pageIndexSelector,
  pageSizeSelector,
  paginationCountSelector,
  paginationSelector,
  setPagination,
} from '../../reducers/cats';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-cats-list',
  templateUrl: './cats-list.component.html',
  styleUrls: ['./cats-list.component.scss'],
})
export class CatsListComponent implements OnInit {
  pageSize: number;
  pageSize$ = this.store.select(pageSizeSelector);
  pageIndex$ = this.store.select(pageIndexSelector);

  cats$ = this.store.select(catsSelector);

  loading$ = this.store.select(loadingSelector);

  paginationAndFilterParams$ = this.store.select(paginationSelector);
  paginationCount$ = this.store.select(paginationCountSelector);

  @ViewChild('paginator') paginator: MatPaginator;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.onPaginationAndFilterParams();
    this.pageSize$.subscribe((pageSize) => (this.pageSize = pageSize));
    this.pageIndex$.subscribe((pageIndex) => {
      if (pageIndex == 0 && this.paginator != undefined)
        this.paginator.firstPage();
    });
  }

  getCatListHeight(): string {
    let height: string;
    if (this.pageSize == 5) {
      height = '260px';
    } else if (this.pageSize == 10) {
      height = '540px';
    } else {
      height = '820px';
    }
    return height;
  }

  onPaginationAndFilterParams(): void {
    this.paginationAndFilterParams$.subscribe((paginationAndFilter) => {
      this.store.dispatch(
        getCats({
          pageIndex: paginationAndFilter.pageIndex,
          pageSize: paginationAndFilter.pageSize,
          breedID: paginationAndFilter.breed,
          format: paginationAndFilter.format,
          category: paginationAndFilter.category,
        })
      );
    });
  }

  onPaginationChange(event: PageEvent): void {
    this.store.dispatch(
      setPagination({ pageIndex: event.pageIndex, pageSize: event.pageSize })
    );
  }
}
