import { Component, OnInit } from '@angular/core';
import { AuthService } from './../auth/auth.service';
import { SidenavService } from '../sidenav/sidenav.service'
import { RightSidenavComponent } from '../rightsidenav/rightsidenav.component';

@Component({
  selector: 'app-toolbar',
  templateUrl: './app-toolbar.component.html',
  styleUrls: ['./app-toolbar.component.css']
})

export class AppToolbarComponent implements OnInit {
  toggleActive = false;

  constructor(
    public auth: AuthService,
    private sidenav: SidenavService) {
    // Check for authentication and handle if hash present
    auth.handleAuth();
  }

  toggleRightSidenav() {
  this.toggleActive = !this.toggleActive;
  this.sidenav.toggle();
  }

  ngOnInit() {
  }

}

