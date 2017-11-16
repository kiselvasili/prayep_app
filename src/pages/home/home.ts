import { Component } from '@angular/core';

import { SignupPage } from './../singup-page/singup-page';
import { LoginPage } from './../login-page/login-page';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public loginPage = LoginPage;
  public signUpPage = SignupPage;

  constructor() {}

}
