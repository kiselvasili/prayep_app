import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Storage } from '@ionic/storage';

import { ProfilePage } from '../profile/profile';
import { LoginPage } from '../login-page/login-page';
// import { HomePage } from './../home/home';
import { AuthService } from '../../core/auth.service';

@IonicPage()
@Component({
    selector: 'page-singup-page',
    templateUrl: 'singup-page.html',
})
export class SignupPage implements OnInit {
    public role: string;
    public email: string;
    public password: string;
    public loading: any;
    public accountForm: FormGroup;

    constructor(public navCtrl: NavController, 
                public navParams: NavParams,
                public authService: AuthService,
                public loadingCtrl: LoadingController,
                public _fb: FormBuilder,
                public storage: Storage) {}

    public ngOnInit(): void {
        this.accountForm = this._fb.group({
            'email': '',
            'password': ''
        });
    }

    public register() {
        this.showLoader();

        this.authService.createAccount(this.accountForm.value)
            .subscribe(data => {
                // this.storage.set('token', data.token);
                this.loading.dismiss();
                this.navCtrl.setRoot(LoginPage);
            },
            (err) => {
                this.loading.dismiss();
            });
    }

    public showLoader() {
        this.loading = this.loadingCtrl.create({
            content: 'Authenticating...'
        });

        this.loading.present();
    }

}
