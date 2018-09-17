import { Component, ViewChild, OnInit } from '@angular/core';
import { AuthService } from './../auth/auth.service';
import { SidenavService } from './sidenav.service';
import { MatSidenav } from '@angular/material';

@Component({
  moduleId: module.id,
  selector: 'mysidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})

export class SidenavComponent implements OnInit {
  @ViewChild('sidenav') public sidenav: MatSidenav;
  events = [];

  constructor(
    private auth: AuthService,
    private sidenavService: SidenavService) {
    // Check for authentication and handle if hash present
    auth.handleAuth();
  }

  ngOnInit(): void {
    this.sidenavService.setSidenav(this.sidenav);
  }

}
