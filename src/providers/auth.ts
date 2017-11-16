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
    return new Promise((resolve, reject) => {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');

      this.http.post('http://localhost:8080/api/auth/register', JSON.stringify(accountDetails), {headers: headers})
        .subscribe(res => {
          let data = res.json();
          this.token = data.token;
          this.storage.set('token', data.token);
          resolve(data);
        }, err => {
            reject(err);
        });
    });
  };

  public login(credentials) {
    return new Promise((resolve, reject) => {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');

      this.http.post('http://localhost:8080/api/auth/login', JSON.stringify(credentials), {headers: headers})
        .subscribe(res => {
          let data = res.json();
          this.token = data.token;
          this.storage.set('token', data.token);
          resolve(data);
        }, err => {
            reject(err);
        });
    });
  };

  public logout() {
    this.storage.set('token', '');
  };

};
