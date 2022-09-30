import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { FormControl } from '@angular/forms';
import { Observable, startWith } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent implements OnInit {
  @Input() inputType: string;
  @Input() dispatchType: string;
  @Input() data$: Observable<any[]>;
  @Input() dispatchFunction: Function;

  data: any[] = [];
  inputForm: FormControl;
  filteredData$: Observable<any[]>;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.inputForm = new FormControl();
    this.store.dispatch({ type: this.dispatchType });
    this.data$.subscribe((data) => {
      this.data = data;
    });
    this.filtered();
  }

  displayFn(data: any): string {
    return data && data.name ? data.name : '';
  }

  useFilter(): void {
    this.dispatchFunction(this.getDataIDFromObject(this.inputForm.value));
  }

  clearFilter(): void {
    this.inputForm.setValue(null);
    if (this.inputType == 'Category') {
      this.dispatchFunction(0);
    } else {
      this.dispatchFunction('');
    }
  }

  private _filter(value: string): any[] {
    const filterValue = value.toLowerCase();
    return this.data.filter((item) =>
      item.name.toLowerCase().includes(filterValue)
    );
  }

  filtered(): void {
    this.filteredData$ = this.inputForm.valueChanges.pipe(
      startWith(''),
      map((value) => {
        const name = typeof value === 'string' ? value : value?.name;
        return name ? this._filter(name as string) : this.data.slice();
      })
    );
  }

  getDataIDFromObject(data: any): string | number {
    if (data == null) {
      return '';
    } else {
      return data.id;
    }
  }
}
