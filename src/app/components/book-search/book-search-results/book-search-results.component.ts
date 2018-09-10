import { Component, OnInit, Input } from '@angular/core';
import { BehaviorSubject } from 'rxjs/';
import { filter } from 'rxjs/operators';
import { IBooksSearchResult } from './interfaces';

@Component({
  selector: 'app-book-search-results',
  templateUrl: './book-search-results.component.html',
  styleUrls: ['./book-search-results.component.scss']
})
export class BookSearchResultsComponent implements OnInit {

  _results: IBooksSearchResult;
  _results$ = new BehaviorSubject<IBooksSearchResult>(null);
  @Input() set results(value: IBooksSearchResult) {
    this._results$.next(value);
  }

  constructor() { }

  ngOnInit() {
    this._results$
        .pipe(
          filter(results => results !== null)
        )
        .subscribe(results => {
          this._results = results;
        });
  }
}
