import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from './../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-callback',
  templateUrl: './callback.component.html',
  styleUrls: ['./callback.component.css']
})

export class CallbackComponent implements OnInit, OnDestroy {
  loggedInSub: Subscription;
  constructor(
    private auth: AuthService,
    private router: Router) { }

  ngOnInit() {
    this.loggedInSub = this.auth.loggedIn$.subscribe(
      loggedIn => loggedIn ? this.router.navigate(['/']) : this.router.navigate(['/'])
    )
  }

  ngOnDestroy() {
    this.loggedInSub.unsubscribe();
  }
}
