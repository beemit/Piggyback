import { Component, OnInit,ViewChild } from '@angular/core';
import { SidenavService } from '../sidenav/sidenav.service';
import { MatSidenav } from '@angular/material';

@Component({
  selector: 'app-right-sidenav',
  templateUrl: './rightsidenav.component.html',
  styleUrls: ['./rightsidenav.component.css']
})

export class RightSidenavComponent implements OnInit {
 @ViewChild('rightSidenav') public sidenav: MatSidenav;
	constructor(
    private sidenavService: SidenavService) {	}

	ngOnInit(): void {
		this.sidenavService.setSidenav(this.sidenav);
	}
}
