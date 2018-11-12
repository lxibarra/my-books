import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { isPlatformBrowser  } from '@angular/common';
import { PLATFORM_ID, Inject } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { EventManager } from '@angular/platform-browser';
import { debounceTime, filter, map } from 'rxjs/operators';
import { GoogleBooksAPIService } from '../../Services/google-books-api.service';
import { IBooksSearchResult, IBookSearchItem } from '../../interfaces/IGoogleBooks';

@Component({
  selector: 'app-book-search',
  templateUrl: './book-search.component.html',
  styleUrls: ['./book-search.component.scss']
})
export class BookSearchComponent implements OnInit {

  @ViewChild('form') searchInput: ElementRef;

  searchForm = new FormGroup({
    criteria: new FormControl('')
  });

  searchBusy = false;
  searchResults: IBooksSearchResult = null;

  @Output() selectBook = new EventEmitter<IBookSearchItem>();
  @Input() placeholder = 'Type to search for books';

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private googleBooksAPI: GoogleBooksAPIService,
    private eventManager: EventManager
  ) {
    this.eventManager.addGlobalEventListener('window', 'scroll', this.manageSearchStickyness.bind(this));
  }

  manageSearchStickyness() {
    const rect = this.searchInput.nativeElement.getBoundingClientRect();
    const visible = rect.bottom >= 0 && rect.left >= 0;
    console.log('Visible', visible);
  }

  onSelectBook(book) {
    this.selectBook.emit(book);
  }

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
