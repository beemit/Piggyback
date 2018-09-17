import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptorProvider, ErrorInterceptorProvider } from './_helpers/index';
import { AppRoutingModule } from './app-routing.module';
import { ApiService } from './api.service';
import { AuthService } from './auth/auth.service';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { CallbackComponent } from './callback/callback.component';
import { ProfileComponent } from './profile/profile.component';
import { AppToolbarComponent } from './app-toolbar/app-toolbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
MatAutocompleteModule,
MatButtonModule,
MatButtonToggleModule,
MatCardModule,
MatCheckboxModule,
MatChipsModule,
MatDatepickerModule,
MatDialogModule,
MatExpansionModule,
MatGridListModule,
MatIconModule,
MatInputModule,
MatListModule,
MatMenuModule,
MatNativeDateModule,
MatPaginatorModule,
MatProgressBarModule,
MatProgressSpinnerModule,
MatRadioModule,
MatRippleModule,
MatSelectModule,
MatSidenavModule,
MatSliderModule,
MatSlideToggleModule,
MatSnackBarModule,
MatSortModule,
MatTableModule,
MatTabsModule,
MatToolbarModule,
MatTooltipModule,
MatStepperModule,
} from '@angular/material';

import { SidenavComponent } from './sidenav/sidenav.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { AgmCoreModule } from '@agm/core';
import { AgmSnazzyInfoWindowModule } from '@agm/snazzy-info-window';
import { SidenavService } from './sidenav/sidenav.service';
import { RightSidenavComponent } from './rightsidenav/rightsidenav.component';
import { FooterComponent } from './footer/footer.component';
import { ProductStoreComponent } from './product-store/product-store.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './register/registration.component';
import { AuthLock } from './auth-service/authguard.guard';
import { AuthenticationService } from './auth-service/authentication.service';
import { AlertComponent } from './alert/alert.component';
import { AlertService } from './alert/alert.service';
import { UserService } from 'app/auth-service/user.service';
@NgModule({
  declarations: [
    LoginComponent,
    RegistrationComponent,
    AppComponent,
    HomeComponent,
    CallbackComponent,
    ProfileComponent,
    AppToolbarComponent,
    SidenavComponent,
    RightSidenavComponent,
    FooterComponent,
    ProductStoreComponent,
    AlertComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatStepperModule,
    environment.production ? ServiceWorkerModule.register('ngsw-worker.js') : [],
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCTaEFqsWI60UbtYpg0DtgsW3zwGpqAYog'
    }),
    AgmSnazzyInfoWindowModule
  ],
  providers: [
    ApiService,
    AuthService,
    SidenavService,
    AuthenticationService,
    AuthLock,
    AlertService,
    UserService,
    JwtInterceptorProvider,
    ErrorInterceptorProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
