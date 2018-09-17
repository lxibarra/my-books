import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor() { }

  loginSuccess(response) {
    // redirect to home page or whatever

  }

  loginError(error) {
    // show error
  }

  ngOnInit() {

  }

}
