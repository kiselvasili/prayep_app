import { HomePage } from './../home/home';
import { AuthService } from './../../providers/auth';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { SignupPage } from '../singup-page/singup-page';

@IonicPage()
@Component({
  selector: 'page-login-page',
  templateUrl: 'login-page.html',
})
export class LoginPage {
  public email: string;
  public password: string;
  public loading: any;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public authService: AuthService,
              public loadingCtrl: LoadingController) {}

  public login() {
    this.showLoader();

    let credentials = {
      email: this.email,
      password: this.password
    };

    this.authService.login(credentials)
      .then((result) => {
        this.loading.dismiss();
        console.log(result);
        this.navCtrl.setRoot(HomePage);
      }, err => {
        this.loading.dismiss();
        console.log(err);
    });
  }

  public launchSignUp() {
    this.navCtrl.push(SignupPage);
  }

  public showLoader(): void {
    this.loading = this.loadingCtrl.create({
      content: "Authencticating..."
    });

    this.loading.present();
  }

}
