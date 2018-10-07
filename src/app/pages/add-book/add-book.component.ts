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
    this.dbService.AddBook(book).then(result => {
      console.log('success', result);
    }).catch(error => {
      console.log(error);
    });
  }

  ngOnInit() {

  }

}
