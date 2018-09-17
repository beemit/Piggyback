import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { ApiService } from './../api.service';
import { AuthService } from './../auth/auth.service';

@Component({
  selector: 'app-product-store',
  templateUrl: './product-store.component.html',
  styleUrls: ['./product-store.component.css']
})
export class ProductStoreComponent implements OnInit, OnDestroy {

  authSubscription: Subscription;
  products: any;
  productsSubscription: Subscription;
  constructor(
    private http: HttpClient,
    private api: ApiService,
    public auth: AuthService) { }

  ngOnInit() {
    // Subscribe to login status subject
    // If authenticated, subscribe to products data observable
    // If not authenticated, unsubscribe from products data
    this.authSubscription = this.auth.loggedIn$.
    subscribe(loggedIn => {
      if (loggedIn) {
        this._getProducts();
      } else {
        this.products = null;
        this._destroyProductsSubscription();
      }
    });
}

ngOnDestroy() {
  // Unsubscribe from observables
  this.authSubscription.unsubscribe();
  this._destroyProductsSubscription();
}

private _getProducts() {
  // Subscribe to products API observable
  this.productsSubscription = this.api.getProducts$()
  .subscribe(
    data => {
      this.products = data['products'];
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
