import { Component, OnInit } from '@angular/core';
import { MapsService } from './maps.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'maps';
  center: google.maps.LatLngLiteral = {lat: 19.3859968, lng: -99.1572127};
  zoom = 12;
  constructor(private mapService: MapsService) {}
  ngOnInit(): void {
    this.mapService.sendOrder();
    this.mapService.getSteps().subscribe((d) => console.log(d));
  }
}
