import { Component, OnInit, ViewChild } from '@angular/core';
import { MembersService } from '../members.service';
import { User } from '../user'


@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})

export class ProfilePage implements OnInit {

public user: User;
public users: Array<User> = [];

 
constructor(
    private membersService: MembersService,
  ) {

}
  ngOnInit() {
    this.getUser();
  }

  public getUser(): User {
    this.users = this.membersService.getUsers();
    this.user = this.users[0];
    return this.user;
    };
}
