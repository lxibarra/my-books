import { Component, OnInit } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID, Inject } from '@angular/core';
import { DatabaseService } from '../../Services/firebaseDB/database.service';
import { IBooksSearchResult, IBookSearchItem } from '../../interfaces/IGoogleBooks';

@Component({
  selector: 'app-my-books-collection',
  templateUrl: './my-books-collection.component.html',
  styleUrls: ['./my-books-collection.component.css']
})
export class MyBooksCollectionComponent implements OnInit {
  results: IBooksSearchResult = {
    totalItems: 0,
    kind: 'existingList',
    items: []
  };

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private db: DatabaseService) { }

  ngOnInit() {
    // check if this can be rendered in the server much quicker
    if (isPlatformBrowser(this.platformId)) {
    // after some testing the following code only executes on the client even if left like this
      this.db.findBooksByCurrentUser().then(results => {
        console.log('Success', results);
        this.results.totalItems = Object.keys(results).length;
        this.results.items = Object.keys(results).map(b => results[b].bookDetail as IBookSearchItem);
      }).catch(error => {
        console.log('Error', error);
      });
     }
  }

}
