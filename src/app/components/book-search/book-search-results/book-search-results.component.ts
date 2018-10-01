import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BehaviorSubject } from 'rxjs/';
import { filter } from 'rxjs/operators';
import { IBooksSearchResult, IBookSearchItem } from '../../../interfaces/IGoogleBooks';

@Component({
  selector: 'app-book-search-results',
  templateUrl: './book-search-results.component.html',
  styleUrls: ['./book-search-results.component.scss']
})
export class BookSearchResultsComponent implements OnInit {

  @Output() selectBook = new EventEmitter<IBookSearchItem>();

  _results: IBooksSearchResult;
  _results$ = new BehaviorSubject<IBooksSearchResult>(null);
  @Input() set results(value: IBooksSearchResult) {
    this._results$.next(value);
  }

  constructor() { }

  onSelectBook(book: IBookSearchItem) {
    this.selectBook.emit(book);
  }

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
