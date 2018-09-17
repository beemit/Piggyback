import { Component, ViewChild, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { SidenavService } from './sidenav/sidenav.service';
import { RightSidenavComponent } from './rightsidenav/rightsidenav.component';
import { MatSidenav } from '@angular/material';

@Component({
  moduleId: module.id,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  @ViewChild('rightSidenav') public sidenav: MatSidenav;

  constructor(private auth: AuthService,
              private sidenavService: SidenavService) {
    // Check for authentication and handle if hash present
    auth.handleAuth();
  }
  ngOnInit(): void {
    this.sidenavService.setSidenav(this.sidenav);
  }

}
