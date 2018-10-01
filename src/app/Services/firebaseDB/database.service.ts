import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/Database';
import { FirebaseAuthService } from '../firebaseAuth/firebase-auth.service';
import { IBookSearchItem } from '../../interfaces/IGoogleBooks';
import { pipe, Observable } from 'rxjs/';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor(private oAuth: FirebaseAuthService, private firebase: AngularFireDatabase) { }

  public AddBook(book: IBookSearchItem) {
     return new Promise((resolve, reject) => {
       this.oAuth.fireBaseAuthStatus()
                       .subscribe(userInfo => {
                         this.findBookInUser(userInfo.uid, book).then(bookStatus => {
                           if (bookStatus === null) {
                             const db = this.firebase.database.ref(`${userInfo.uid}/books`);
                             return db.push(
                               {
                                 id: book.id,
                                 dateAdded: new Date().toISOString()
                               }
                             )
                             .then(resolve);
                           } else {
                             reject({ error: 'The book has already been added '});
                           }
                         });
                       }, error => {
                         reject(error);
                       });
     });
  }

  private findBookInUser(userId: string, book: IBookSearchItem) {
    return new Promise((resolve, reject) => {
      const db = this.firebase.database.ref(`${userId}/books`);
      const value = db.orderByChild('id').equalTo(book.id).once('value', (data) =>  {
        return resolve(data.val());
      });
    });

  }

  public findBookInCurrentUser(book: IBookSearchItem) {
    return new Promise((resolve, reject) => {
      this.oAuth.fireBaseAuthStatus()
                      .subscribe(userInfo => {
                        resolve(this.findBookInUser(userInfo.uid, book));
                      }, error => {
                        reject(error);
                      });
    });
  }
}
