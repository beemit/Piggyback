import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { AuthLock } from './auth-service/authguard.guard';
import { HomeComponent } from './home/home.component';
import { CallbackComponent } from './callback/callback.component';
import { ProfileComponent } from './profile/profile.component';
import { ProductStoreComponent } from './product-store/product-store.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './register/registration.component';

@NgModule({
  imports: [
    RouterModule.forRoot([
      {
        path: '',
        component: HomeComponent
      },
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'register',
        component: RegistrationComponent
      },
      {
        path: 'callback',
        component: CallbackComponent
      },
      {
        path: 'profile',
        component: ProfileComponent,
        canActivate: [
          AuthGuard
        ]
      },
      {
        path: 'store',
        component: ProductStoreComponent,
        canActivate: [
          AuthLock
        ]
      },
      {
        path: '**',
        redirectTo: '',
        pathMatch: 'full'
      }
    ])
  ],
  providers: [
    AuthGuard,
    AuthLock
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}
