import { Injectable } from '@angular/core';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class MembersService {

  private users: Array<User> = [{
    id: '1',
    user: 'user_1',
    mail: 'user@usermail.com',
    password: 'xxxyyy',
    description: 'lorem ipsum lorem ipsum lorem ipsum lorem ipsum'
  },
  {
    id: '2',
    user: 'user_2',
    mail: 'user2@usermail.com',
    password: 'xxxyyy',
    description: 'lorem ipsum lorem ipsum lorem ipsum lorem ipsum'
  },
  {
    id: '3',
    user: 'user_3',
    mail: 'user3@usermail.com',
    password: 'xxxyyy',
    description: 'lorem ipsum lorem ipsum lorem ipsum lorem ipsum'
  },
  {
    id: '4',
    user: 'user_4',
    mail: 'user4@usermail.com',
    password: 'xxxyyy',
    description: 'lorem ipsum lorem ipsum lorem ipsum lorem ipsum'
  }];


  constructor(private user: User) { }


  public getUsers(): Array<User> {
    return this.users;
  }
}
