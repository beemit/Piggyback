import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { appConfig } from '../app.config';

@Injectable()
export class AuthenticationService {

     constructor(
       private http: HttpClient) { }

    logout() {
      // remove user from local storage to log user out
      localStorage.removeItem('currentUser');
  }

    login(email: string, password: string) {
      return this.http.post<any>(appConfig.apiUrl + 'user/login', { email: email, password: password })
      .pipe(map(user => {
              // login successful if there's a jwt token in the response
              if (user ) {
                  // store user details and jwt token in local storage to keep user logged in between page refreshes
                  localStorage.setItem('currentUser', JSON.stringify(user));
              }
              return user;
          }
        ));
  }
}
