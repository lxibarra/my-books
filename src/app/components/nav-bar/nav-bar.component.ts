import { Component, OnInit } from '@angular/core';
import { User } from 'firebase';
import { FirebaseAuthService } from '../../Services/firebaseAuth/firebase-auth.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  user: User = null;

  constructor(private oAuth: FirebaseAuthService) { }

  logOut() {
    this.oAuth.fireBaseLogOut();
  }

  ngOnInit() {
    this.oAuth.fireBaseAuthStatus()
        .subscribe(user => {
          this.user = user;
          console.log('User info at navbar', user);
        });
  }

}
