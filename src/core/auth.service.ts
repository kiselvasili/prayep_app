import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { JwtHelper } from 'angular2-jwt';
import 'rxjs/add/operator/map';

import { ExtendedHttpService } from './http.service';

@Injectable()
export class AuthService {
    private jwtHelper: JwtHelper = new JwtHelper();
    public token: string;

    constructor(public http: ExtendedHttpService,
                public storage: Storage) {}

    public createAccount(accountDetails) {
        // return this.http.post('https://prayer-app-kk-vk.herokuapp.com/api/auth/register', accountDetails)
        return this.http.post<any>('http://localhost:8080/api/auth/register', accountDetails);
    };
 
    public auth(credentials) {
        return this.http.post<any>('http://localhost:8080/api/auth', credentials);
    };

    public login() {
        return this.http.get('http://localhost:8080/api/user/login');
    }

    public authWithFacebook(facebookCredentials) {
        return this.http.post<any>('http://localhost:8080/api/auth/facebook', facebookCredentials);
    }
    
    public logout() {
        this.storage.set('token', '');
    };

    public retrieve() {
        return this.storage.get('token')
            .then(token => {
                return token;
            });

    }
};
