import {throwError as observableThrowError,  Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';


@Injectable()
export class ApiService {
  private baseUrl = 'http://localhost:3001/api/';
  private adminUrl = 'http://localhost:3001/';
  constructor(private http: HttpClient) { }

  dailyForecast() {
    return this.http.get('http://api.openweathermap.org/data/2.5/forecast?q=Delisle,Ca&units=metric&appid=b545ae8872c1c05b85d26cadd26f54e9')
    .pipe(map(result => result));
  }

  getPrices() {
    return this.http.get('https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC,XRP,ETH,IOT&tsyms=USD')
    .pipe(map(result => result));
  }

  getTvshows$(): Observable<any> {
    return this.http
      .get(`${this.baseUrl}tvshows`, {
        headers: new HttpHeaders().set(
          'Authorization', `Bearer ${localStorage.getItem('access_token')}`
        )
      })
      .pipe((catchError(this._handleError)));
  }

  getProducts$(): Observable<any> {
    return this.http
      .get(`${this.adminUrl}products`, {
        headers: new HttpHeaders().set(
          'Authorization', `Bearer ${localStorage.getItem('access_token')}`
        )
      })
      .pipe((catchError(this._handleError)));
  }

  private _handleError(err: HttpErrorResponse | any) {
    const errorMsg = err.message || 'Unable to retrieve data';
    return observableThrowError(errorMsg);
  }

}

