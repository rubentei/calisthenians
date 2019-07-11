import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AuthPage } from './auth.page';
import { LoginFormPage } from './login-form/login-form.page';
import { RegisterFormPage } from './register-form/register-form.page';

const routes: Routes = [
{path: 'login-form', component: LoginFormPage},
{path: 'register-form', component: RegisterFormPage}
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    AuthPage,
    LoginFormPage,
    RegisterFormPage
  ]
})
export class AuthPageModule {}
