import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription ,  Observable, of, throwError } from 'rxjs';
import { ApiService } from './../api.service';
import { AuthService } from './../auth/auth.service';
import { Chart } from 'chart.js';
import { HttpClient } from 'selenium-webdriver/http';
import { map, catchError } from 'rxjs/operators';

@Component({
  moduleId: module.id,
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  objectKeys = Object.keys;
  cryptos: any;
  tvshows: any[];
  name: any;
  price: any;
  authSubscription: Subscription;
  tvshowsSubscription: Subscription;
  products: any;
  productsSubscription: Subscription;
  chart = []; // This will hold our chart info
  city = [];
  country = [];
  currentWeather = [];
  constructor(
       private api: ApiService,
       public auth: AuthService) { }

  ngOnInit() {
    // Subscribe to login status subject
    // If authenticated, subscribe to tvshows data observable
    // If not authenticated, unsubscribe from tvshows data
    this.authSubscription = this.auth.loggedIn$.
    subscribe(loggedIn => {
      if (loggedIn) {
        this.api.getPrices()
      .subscribe(res => {
        this.cryptos = res;
      });

        this._getTvshows();

        this._getProducts();

        this.api.dailyForecast()
        .subscribe(res => {
          console.log(res);

        });


      } else {
        this.tvshows = null;
        this._destroyTvshowsSubscription();
        this.products = null;
        this._destroyProductsSubscription();
      }
    });
  }

  ngOnDestroy() {
    // Unsubscribe from observables
    this.authSubscription.unsubscribe();
    this._destroyTvshowsSubscription();
    this._destroyProductsSubscription();
  }



  private _getTvshows() {
    // Subscribe to tvshows API observable
    this.tvshowsSubscription = this.api.getTvshows$()
    .subscribe(
      data => {
        this.tvshows = data;
      },
      err => console.warn(err),
      () => console.log('Request complete')
    );
  }

  private _destroyTvshowsSubscription() {
    // If a tvshows subscription exists, unsubscribe
    if (this.tvshowsSubscription) {
      this.tvshowsSubscription.unsubscribe();
    }
  }

  get tvshowsExist() {
    return !!this.tvshows && this.tvshows.length;
  }

  private _getProducts() {
    // Subscribe to products API observable
    this.productsSubscription = this.api.getProducts$()
    .subscribe(
      data => {
        this.products = data['products'];

        console.log(name);
      },
      err => console.warn(err),
      () => console.log('Product Request complete')
    );
  }

  private _destroyProductsSubscription() {
    // If a products subscription exists, unsubscribe
    if (this.productsSubscription) {
      this.productsSubscription.unsubscribe();
    }
  }

  get productsExist() {
    return !!this.products && this.products.length;
  }
}
