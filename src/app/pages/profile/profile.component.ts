import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IProfile } from '../../interfaces/IProfile';
import { DatabaseService } from '../../Services/firebaseDB/database.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  model: IProfile = {
    profileUrl: ''
  };

  constructor(private db: DatabaseService) { }

  submit(form: NgForm) {
    // make sure profileUrl its slugified
    // prevent user clicking multiple times.

    this.db.findRepeatedProfileUrl(this.model.profileUrl).then(result => {
      console.log('Cameback success as ', result);
    }).catch(error => {
      console.log('Error', error);
    });

    // this is working but it does not check for repeated profiles.
    /*this.db.setProfile(form.value)
           .then((result) => {
             // display success to user
           })
           .catch(error => {
             // display error to user.
           });*/

  }

  ngOnInit() {
  }

}
