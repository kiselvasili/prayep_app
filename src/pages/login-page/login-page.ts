import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';

import { HomePage } from './../home/home';
import { AuthService } from './../../core/auth.service';
import { SignupPage } from '../singup-page/singup-page';
import { ProfilePage } from '../profile/profile';

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
                public _fb: FormBuilder,
                public facebook: Facebook) {}

    public ngOnInit(): void {
        this.credentials = this._fb.group({
            'email': '',
            'password': ''
        });
    }

    public login() {
        this.showLoader();

        console.log(this.credentials.value);

        this.authService.auth(this.credentials.value)
            .subscribe(data => {
                this.loading.dismiss();
                if (!data.token) {
                    return;
                }
                this.storage.set('token', data.token)
                    .then(() => {
                        console.log('token set');
                    });
                this.authService.login()
                    .subscribe(data => {
                        console.log('user', data);
                        if (data) {
                            this.navCtrl.setRoot(ProfilePage);
                        }
                    },
                    (err) => {
                        console.log('wrong');                    
                    });

                console.log('data', data);
            },
            (err) => {
                console.log('wrong 2');
                this.loading.dismiss();
            });
    }

    public loginWithFacebook() {
        this.showLoader();
        console.log('here login facebook sdfsdfsdfssf');
        this.facebook.login(['email', 'public_profile'])
            .then((response: FacebookLoginResponse) => {
                this.facebook.api('me?fields=id', [])
                    .then(profile => {
                        console.log('profile', profile);
                        this.authService.authWithFacebook(profile)
                            .subscribe((data) => {
                                if (!data.token) {
                                    return
                                }
                                this.storage.set('token', data.token);
                                this.authService.login()
                                .subscribe(data => {
                                    this.loading.dismiss();
                                    console.log('user', data);
                                    if (data) {
                                        this.navCtrl.setRoot(ProfilePage);
                                    }
                                },
                                (err) => {
                                    this.loading.dismiss();
                                    console.log('wrong');                    
                                });
                            },
                            (err) => {
                                this.loading.dismiss();
                            });
                    });
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
