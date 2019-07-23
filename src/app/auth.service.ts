import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  public async userLogin(user, password) {
   var auth =
    await this.http.post('http://localhost:3000/users/login', {
      user: user,
      password: password
    }).toPromise();

    return auth;
  };

  public async userRegister(user, email, password) {
    var auth =
    await this.http.post('http://localhost:3000/users/register', {
      user: user,
      email: email,
      password: password
    }).toPromise();
    return auth;
  }
}
