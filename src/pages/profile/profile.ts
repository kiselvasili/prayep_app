import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { LoginPage } from '../login-page/login-page';

@IonicPage()
@Component({
    selector: 'profile-page',
    templateUrl: 'profile.html'
})
export class ProfilePage {
    constructor(private storage: Storage,
                private navCtrl: NavController) {}

    ionViewCanEnter(): boolean {
        return true;
    }

    public logout() {
        console.log('log outsdfd');
        this.storage.remove('token');
        this.navCtrl.setRoot(LoginPage);
    }
}