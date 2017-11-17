import { Http, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {
    public token: string;

    constructor(public http: Http,
                public storage: Storage) {}

    public createAccount(accountDetails) {
        // return this.http.post('https://prayer-app-kk-vk.herokuapp.com/api/auth/register', accountDetails)
        return this.http.post('http://localhost:8080/api/auth/register', accountDetails);
    };

    public login(credentials) {
        return this.http.post('http://localhost:8080/api/auth/login', credentials);
    };

    public logout() {
        this.storage.set('token', '');
    };

};
