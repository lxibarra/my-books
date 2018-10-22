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

  formMsg = {
    type: '',
    msg: ''
  };

  constructor(
    private db: DatabaseService
  ) { }

  submit(form: NgForm) {
    this.formMsg.type = '';
    this.formMsg.msg = '';
    this.db.updateProfile(this.model).subscribe(response => {
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
