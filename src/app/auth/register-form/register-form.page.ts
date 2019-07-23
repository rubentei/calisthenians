import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.page.html',
  styleUrls: ['./register-form.page.scss'],
})
export class RegisterFormPage implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  public async userRegister(userName, userEmail, userPassword){
    var auth;
    const request = await this.authService.userRegister(userName, userEmail, userPassword);
    auth = request;
    if (auth.auth === true) {
      this.router.navigate(['/home']);
    };
  };
}
