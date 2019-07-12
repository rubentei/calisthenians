import { Component, OnInit } from '@angular/core';
import { MembersService } from '../members.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})

export class ProfilePage implements OnInit {

constructor(
    public membersService: MembersService,
  ) {
//console.log(this.membersService.accessControl());
}
  ngOnInit() {
  }
}
