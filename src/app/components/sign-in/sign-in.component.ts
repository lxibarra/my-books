import { Component, OnInit, Output, EventEmitter } from '@angular/core';
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

  googleProvider = GOOGLE_PROVIDER;
  facebookProvider = FACEBOOK_PROVIDER;
  twitterProvider = TWITTER_PROVIDER;

  @Output() loginSuccess = new EventEmitter<any>();
  @Output() loginError = new EventEmitter<any>();

  constructor(private oAuth: FirebaseAuthService) { }

  handleSuccess(service, response) {
    console.log('Handle Success');
  }

  handleError(service, error) {
    console.log('Handle Error');
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

  }

}
