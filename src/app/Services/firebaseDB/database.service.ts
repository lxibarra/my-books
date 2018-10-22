import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/Database';
import { AngularFireFunctions } from '@angular/fire/functions';
import { FirebaseAuthService } from '../firebaseAuth/firebase-auth.service';
import { IBookSearchItem } from '../../interfaces/IGoogleBooks';
import { IProfile } from '../../interfaces/IProfile';
import { pipe, Observable } from 'rxjs/';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor(private oAuth: FirebaseAuthService,
             private firebase: AngularFireDatabase,
             private functions: AngularFireFunctions,
             private http: HttpClient) { }

  // for now we are going to store some minimal user book information to reduce the scope of the project.
  // there is no way to retreive multiple book information by id unless you create a google bookshelf or
  // use something like graphql to avoid making multiple calls.
  public AddBook(book: IBookSearchItem) {
     return new Promise((resolve, reject) => {
       this.oAuth.fireBaseAuthStatus()
                       .subscribe(userInfo => {
                         this.findBookInUser(userInfo.uid, book).then(bookStatus => {
                           if (bookStatus === null) {
                             const db = this.firebase.database.ref(`${userInfo.uid}/books`);
                             return db.push(
                               {
                                 bookId: book.id,
                                 bookDetail: book,
                                 userData: {
                                   dateAdded: new Date().toISOString()
                                 }
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
      const db = this.firebase.database.ref(`${userId}/books`)
                .orderByChild('bookId')
                .equalTo(book.id)
                .once('value')
                .then(snapShot => {
                    resolve(snapShot.val());
                }).catch(reject);
    });
  }

  public findBooksByCurrentUser() {
    return new Promise((resolve, reject) => {
      this.oAuth.fireBaseAuthStatus()
          .subscribe(userInfo => {
            if (userInfo) {
              const db = this.firebase.database.ref(`${userInfo.uid}/books`);
              db.orderByChild('dateAdded').on('value', (data) => {
                return resolve(data.val());
              });
            } else {
              return reject({ error: 'User is not authenticated' });
            }
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

  public updateProfile(profile: IProfile) {
    return this.functions.httpsCallable('app/checkRepeatedProfile')({...profile});
  }

  public getUserProfile(): Promise<IProfile> {
    return new Promise((resolve, reject) => {
      this.oAuth.fireBaseAuthStatus()
      .subscribe(userInfo => {
      const db = this.firebase.database.ref(`${userInfo.uid}/profile`);
      db.on('value', snapShot => resolve(snapShot.val()));
      }, reject);
    });
  }
}
