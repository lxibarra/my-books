import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { isPlatformBrowser  } from '@angular/common';
import { PLATFORM_ID, Inject } from '@angular/core';
import { User } from 'firebase/';
import {
    FirebaseAuthService,
    GOOGLE_PROVIDER,
    FACEBOOK_PROVIDER,
    TWITTER_PROVIDER
} from '../../Services/firebaseAuth/firebase-auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  user: User = null;
  initialLoad = true;
  googleProvider = GOOGLE_PROVIDER;
  facebookProvider = FACEBOOK_PROVIDER;
  twitterProvider = TWITTER_PROVIDER;

  @Output() loginSuccess = new EventEmitter<any>();
  @Output() loginError = new EventEmitter<any>();

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private oAuth: FirebaseAuthService,
    private router: Router
  ) { }

  handleSuccess(service, response) {
    this.router.navigateByUrl('/books');
  }

  handleError(service, error) {
    console.log('Handle Error');
  }

  logOut() {
    this.oAuth.fireBaseLogOut().then(() => {
      console.log('succesfully log out');
    }).catch(error => {
      console.log('Unable to log out');
    });
  }

  login(service) {
    this.oAuth.fireBaseLoginSignup(service).then(response => {
      this.loginSuccess.emit(response);
      this.handleSuccess(service, response);
    })
    .catch(error => {
      this.loginError.emit(error);
      this.handleError(service, error);
    });
  }

  ngOnInit() {
      if (isPlatformBrowser(this.platformId)) {
        this.oAuth.fireBaseAuthStatus().subscribe(user => {
            this.initialLoad = false;
            this.user = user;
        });
      }
  }

}
