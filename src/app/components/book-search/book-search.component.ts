import { Component, OnInit, Input } from '@angular/core';
import { isPlatformBrowser  } from '@angular/common';
import { PLATFORM_ID, Inject } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { debounceTime, filter, map } from 'rxjs/operators';
import { GoogleBooksAPIService } from '../../Services/google-books-api.service';
import { IBooksSearchResult } from './book-search-results/interfaces';

@Component({
  selector: 'app-book-search',
  templateUrl: './book-search.component.html',
  styleUrls: ['./book-search.component.scss']
})
export class BookSearchComponent implements OnInit {

  searchForm = new FormGroup({
    criteria: new FormControl('')
  });

  searchBusy = false;
  searchResults: IBooksSearchResult = null;

  @Input() placeholder = 'Type to search for books';

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private googleBooksAPI: GoogleBooksAPIService
  ) { }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.searchForm
          .valueChanges
          .pipe(
            debounceTime(400),
            filter(form => form.criteria.length > 2),
          )
          .subscribe(form => {
            this.searchBusy = true;
            this.googleBooksAPI
                .searchBooks(form.criteria)
                .subscribe(
                  results => {
                    this.searchResults = results;
                  },
                  error => {
                    console.log('Trigger Error ', error);
                    this.searchResults = null;
                    this.searchBusy = false;
                  },
                  () => {
                    this.searchBusy = false;
                  }
                );
          });
    }
  }

}
