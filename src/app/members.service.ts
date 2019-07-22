import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class MembersService {

  private auth: Boolean = false;
  private users: Array<User> = [];
  private singleUser: User;


  constructor(private user: User, private http: HttpClient) { }


  public getUsers(): Array<User> {
    return this.users;
  }

  public getUser(): void {
    const userId = '5d345e25654b743ce00d93d3';
    this.http.get(`http://localhost:3000/users/${userId}`).subscribe((response) => {
      console.log(response);
    });
    // return this.singleUser;
  }
}
