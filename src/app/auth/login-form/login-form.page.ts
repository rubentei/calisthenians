import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.page.html',
  styleUrls: ['./login-form.page.scss'],
})
export class LoginFormPage implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  public async userLogin(user: string, password: string) {
    var auth;
    const request = await this.authService.userLogin(user, password);
    auth = request;
    if (auth.auth === true) {
      this.router.navigate(['/home']);
    }
  };
}
