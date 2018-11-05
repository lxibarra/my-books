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
    profileUrl: '',
    publicFullName: '',
    identityProfileName: ''
  };

  formMsg = {
    type: '',
    msg: ''
  };

  constructor(
    private db: DatabaseService
  ) { }

  dismissMsg() {
    this.formMsg.type = '';
  }

  submit(form: NgForm) {
    this.formMsg.type = 'info';
    this.formMsg.msg = 'updating profile...';
    const { profileUrl, publicFullName } = this.model;
    this.db.updateProfile({ profileUrl, publicFullName }).subscribe(response => {
      if (response.updated === true) {
        this.model = response.data;
        this.formMsg.type = 'success';
        this.formMsg.msg = 'Profile information updated successfully';
      }
      if (response.error) {
        this.formMsg.type = 'danger';
        this.formMsg.msg = response.error.msg;
      }
    }, error => {
      this.formMsg.type = 'danger';
      this.formMsg.msg = 'Unable to update profile information because of a server error.';
    });
  }

  ngOnInit() {
     this.db.getUserProfile().then(response => {
       this.model = response;
     });
  }

}
