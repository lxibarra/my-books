import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor() { }

  loginSuccess(response) {
    // manage state and set the app as auth.
  }

  loginError(error) {
    // manage state and set the app as non auth
  }

  ngOnInit() {

  }

}
