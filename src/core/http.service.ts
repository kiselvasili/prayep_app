import { Injectable } from '@angular/core';
import { Http, XHRBackend, RequestOptions, Request, RequestOptionsArgs, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs';
import { Storage } from '@ionic/storage';

@Injectable()
export class ExtendedHttpService extends Http {
    private token: string;

    constructor (private backend: XHRBackend,
                 private storage: Storage,
                         options: RequestOptions) {                
        super(backend, options);
    }

    public request(url: string|Request, options?: RequestOptionsArgs): Observable<Response> {
        return Observable.fromPromise(
            this.storage.get('token')
            .then(val => {
                console.log('request token here', val);
                this.token = val;
            })
        )
        .flatMap(() => {
            if (typeof url === 'string') {
                if (!options) {
                    options = {headers: new Headers()};
                }
                options.headers.set('Authorization', this.token);
            } else {
                url.headers.set('Authorization', this.token);
                if (!(url.getBody() instanceof FormData)) {
                    url.headers.set('Content-Type', 'application/json');
                    JSON.stringify(url.getBody());
                }
            }
            return super.request(url, options).catch(this.catchAuthError);
        });
    }

    public get<T>(url: string, options?: any): Observable<T> {
        return super.get(url, options)
                    .map((data: Response) => this.parseJSON<T>(data));
    }

    public post<T>(url: string, options?: any): Observable<T> {
        return super.post(url, options)
                    .map((data: Response) => this.parseJSON<T>(data));
    }

    public put<T>(url: string, options?: any): Observable<T> {
        return super.put(url, options)
                    .map((data: Response) => this.parseJSON<T>(data));
    }

    public delete<T>(url: string, options?: any): Observable<T> {
        return super.delete(url, options)
                    .map((data: Response) => this.parseJSON<T>(data));
    }

    private parseJSON<T>(data: Response): T {
        return data.json();
    }

    private catchAuthError (err: any) {
        if ((err instanceof Response) && (err.status === 401 || err.status === 403)) {
            console.log(err);
        }
        return Observable.throw(err);
    }
}