import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { setSelectedFormat } from '../../reducers/cats';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  format: FormControl;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.format = new FormControl('');
    this.onFormatChange();
  }

  onFormatChange(): void {
    this.format.valueChanges.subscribe((format) => {
      this.store.dispatch(setSelectedFormat({ format: format }));
    });
  }
}
