import { HomePage } from './../home/home';
import { AuthService } from './../../providers/auth';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-singup-page',
  templateUrl: 'singup-page.html',
})
export class SignupPage {
  public role: string;
  public email: string;
  public password: string;
  public loading: any;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public authService: AuthService,
              public loadingCtrl: LoadingController) {
  }

  public register() {
    this.showLoader();
    
    let accountDetails = {
      email: this.email,
      password: this.password
      // role: this.role
    };
    console.log('here', accountDetails);

    this.authService.createAccount(accountDetails)
      .then(result => {
        this.loading.dismiss();
        console.log(result);
        this.navCtrl.setRoot(HomePage);
      }, err => {
        this.loading.dismiss();
    })
  }

  public showLoader() {
    this.loading = this.loadingCtrl.create({
      content: 'Authenticating...'
    });

    this.loading.present();
  }

}
