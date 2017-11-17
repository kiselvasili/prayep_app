import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';

import { HomePage } from './../home/home';
import { AuthService } from './../../core/auth.service';
import { SignupPage } from '../singup-page/singup-page';

@IonicPage()
@Component({
    selector: 'page-login-page',
    templateUrl: 'login-page.html',
})
export class LoginPage implements OnInit{
    public email: string;
    public password: string;
    public loading: any;
    public credentials: FormGroup;

    constructor(public navCtrl: NavController, 
                public navParams: NavParams,
                public authService: AuthService,
                public loadingCtrl: LoadingController,
                public storage: Storage,
                public _fb: FormBuilder) {}

    public ngOnInit(): void {
        this.credentials = this._fb.group({
            'email': '',
            'password': ''
        });
    }

    public login() {
        this.showLoader();

        console.log(this.credentials.value);

        this.authService.login(this.credentials.value)
            .subscribe(data => {
                this.loading.dismiss();
                console.log('data', data);
            },
            (err) => {
                this.loading.dismiss();
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
