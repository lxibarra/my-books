import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../../Services/firebaseDB/database.service';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent implements OnInit {

  constructor(private dbService: DatabaseService) { }

  onSelectBook(book) {
    // make sure the same book is not added twice
    this.dbService.AddBook(book).then(result => {
      console.log('success', result);
    }).catch(error => {
      console.log(error);
    });
  }

  ngOnInit() {
    /*
    // this will be here just for the cases where we need user data in the page
    this.oAuth.fireBaseAuthStatus().subscribe(fireBaseUser => {
      // move this logic to another class and extend it so you can redirect the user if its not
      // logged in.
        if (!fireBaseUser) {
          this.router.navigate(['/login']);
        }
    });
    */
  }

}
