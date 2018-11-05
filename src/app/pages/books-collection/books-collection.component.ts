import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IBooksSearchResult, IBookSearchItem } from '../../interfaces/IGoogleBooks';
import { DatabaseService } from '../../Services/firebaseDB/database.service';
import { map, flatMap } from 'rxjs/operators';

@Component({
  selector: 'app-books-collection',
  templateUrl: './books-collection.component.html',
  styleUrls: ['./books-collection.component.css']
})
export class BooksCollectionComponent implements OnInit {

  profile: any = {}; // introduce an interface later
  init = true;
  results: IBooksSearchResult = {
    totalItems: 0,
    kind: 'existingList',
    items: []
  };

  constructor(private activatedRoute: ActivatedRoute, private dbService: DatabaseService) { }

  handlePublicProfile(profile) {
    this.profile = {
      publicFullName: profile.publicFullName || `User's`
    };
  }

  ngOnInit() {

    this.activatedRoute
        .params
        .subscribe(params => {
          const { user } = params;
          this.dbService
              .getUserPublicProfile(user)
              .subscribe(({ books, profile }) => {
                this.handlePublicProfile(profile);
                const bookIds = Object.keys(books);
                this.results.totalItems = bookIds.length;
                this.results.items = bookIds.map(b => books[b].bookDetail as IBookSearchItem);
                this.init = false;
              }, error => {
                console.log('Server Error', error);
              });
        });
  }

}
