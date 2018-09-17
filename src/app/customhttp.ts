import {throwError as observableThrowError,  Observable } from 'rxjs';
import { map, filter, catchError, mergeMap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { ConnectionBackend, XHRBackend, RequestOptions, Request, RequestOptionsArgs, Response, Http, Headers } from '@angular/http';
import { appConfig } from './app.config';

@Injectable()
export class CustomHttp extends Http {
    constructor(backend: ConnectionBackend, defaultOptions: RequestOptions) {
        super(backend, defaultOptions);
    }

    get(url: string, options?: RequestOptionsArgs): Observable<Response> {
        return super.get(appConfig.apiUrl + url, this.addJwt(options)).pipe(catchError(this.handleError));
    }

    post(url: string, body: string, options?: RequestOptionsArgs): Observable<Response> {
        return super.post(appConfig.apiUrl + url, body, this.addJwt(options)).pipe(catchError(this.handleError));
    }

    put(url: string, body: string, options?: RequestOptionsArgs): Observable<Response> {
        return super.put(appConfig.apiUrl + url, body, this.addJwt(options)).pipe(catchError(this.handleError));
    }

    delete(url: string, options?: RequestOptionsArgs): Observable<Response> {
        return super.delete(appConfig.apiUrl + url, this.addJwt(options)).pipe(catchError(this.handleError))
    }

    // private helper methods

    private addJwt(options?: RequestOptionsArgs): RequestOptionsArgs {
        // ensure request options and headers are not null
        options = options || new RequestOptions();
        options.headers = options.headers || new Headers();

        // add authorization header with jwt token
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.token) {
            options.headers.append('Authorization', 'Bearer ' + currentUser.token);
        }

        return options;
    }

    private handleError(error: any) {
        if (error.status === 401) {
            // 401 unauthorized response so log user out of client
            window.location.href = '/login';
        }
        return observableThrowError(error._body);
    }
}

export function customHttpFactory(xhrBackend: XHRBackend, requestOptions: RequestOptions): Http {
    return new CustomHttp(xhrBackend, requestOptions);
}

export let customHttpProvider = {
    provide: Http,
    useFactory: customHttpFactory,
    deps: [XHRBackend, RequestOptions]
};
