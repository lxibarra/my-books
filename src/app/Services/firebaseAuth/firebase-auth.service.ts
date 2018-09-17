import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/';
import { Observable } from 'rxjs/';
import { User } from 'firebase';

export const GOOGLE_PROVIDER = 'GoogleAuthProvider';
export const FACEBOOK_PROVIDER = 'FacebookAuthProvider';
export const TWITTER_PROVIDER = 'TwitterAuthProvider';

@Injectable({
  providedIn: 'root'
})
export class FirebaseAuthService {

  constructor(public fireOAuth: AngularFireAuth) { }

  public fireBaseLoginSignup(service): Promise<any> {
    const provider = new auth[service]();
    return this.fireOAuth.auth.signInWithPopup(provider);
  }

  public fireBaseAuthStatus(): Observable<User> {
    return this.fireOAuth.authState;
  }

  public fireBaseLogOut() {
    return auth().signOut();
  }

}
