import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { LoginPage } from '../login-page/login-page';
import { TestPageOne } from '../test-page-one/test-page-one';

@IonicPage()
@Component({
    selector: 'profile-page',
    templateUrl: 'profile.html'
})
export class ProfilePage {
    public rootPage: any = TestPageOne;

    constructor(private storage: Storage,
                private navCtrl: NavController) {
                    console.log(navCtrl);
                }

    ionViewCanEnter(): boolean {
        return true;
    }

    public logout() {
        console.log('log outsdfd');
        this.storage.remove('token');
        this.navCtrl.setRoot(LoginPage);
    }
}