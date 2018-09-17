import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from './../api.service';
import { AuthenticationService } from './../auth-service/authentication.service';
import { AlertService } from './../alert/alert.service';

@Component({
  moduleId: module.id,
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  model: any = {};
  loading = false;
  returnUrl: string;
  email: string;
  password: string;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private api: ApiService,
    public authenticationservice: AuthenticationService,
    private alertService: AlertService) { }

  ngOnInit() {
    // reset login status
    this.authenticationservice.logout();

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['rl'] || '/';
}

  loginUser() {
    this.loading = true;
    this.authenticationservice.login(this.model.email, this.model.password)
      .subscribe(
        data => {
        this.router.navigate([this.returnUrl]);
    },
    error => {
        this.alertService.error(error);
        this.loading = false;
    });
  }
}
