import { Component, OnInit } from '@angular/core';
import { AgmCoreModule } from '@agm/core';
import { AgmSnazzyInfoWindowModule } from '@agm/snazzy-info-window';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})

export class FooterComponent implements OnInit {
  lat: number = 35.6618;
  lng: number = 139.7041;
  isLocationChosen = false;

  locationChosen(event) {
    this.lat = event.coords.lat;
    this.lng = event.coords.lng;
    this.isLocationChosen = true;    
  }
  constructor() { }

  ngOnInit() {
  }

}
