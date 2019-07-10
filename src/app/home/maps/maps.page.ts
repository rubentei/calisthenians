import { Component, ViewChild, ElementRef } from '@angular/core';

import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder, NativeGeocoderReverseResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';
import { MarkerOptions, LatLng } from '@ionic-native/google-maps';
import { PlaceService } from 'src/app/place.service';

declare var google;

@Component({
  selector: 'app-maps',
  templateUrl: './maps.page.html',
  styleUrls: ['./maps.page.scss'],
})
export class MapsPage {
  public places = [];

  @ViewChild('map') mapElement: ElementRef;
  map: any;
  address: string;

  constructor(
    private geolocation: Geolocation,
    private nativeGeocoder: NativeGeocoder,
    private placeService: PlaceService) {
  }


  ngOnInit() {
    this.loadMap();
    this.places = this.placeService.getPlaces();
  }

  loadMap() {
    this.geolocation.getCurrentPosition().then((resp) => {
      let latLng = new google.maps.LatLng(resp.coords.latitude, resp.coords.longitude);
      let mapOptions = {
        center: latLng,
        zoom: 13,
        disableDefaultUI: true,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
      }
      this.getAddressFromCoords(resp.coords.latitude, resp.coords.longitude);

      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

      this.map.addListener('tilesloaded', () => {
        console.log('accuracy', this.map);
        this.getAddressFromCoords(this.map.center.lat(), this.map.center.lng())
      });

    }).catch((error) => {
      console.log('Error getting location', error);
    });

    this.addMarkerCurrentPos();
  }

  getAddressFromCoords(lattitude, longitude) {
    console.log("getAddressFromCoords " + lattitude + " " + longitude);
    let options: NativeGeocoderOptions = {
      useLocale: true,
      maxResults: 5
    };

    this.nativeGeocoder.reverseGeocode(lattitude, longitude, options)
      .then((result: NativeGeocoderReverseResult[]) => {
        this.address = "";
        let responseAddress = [];
        for (let [key, value] of Object.entries(result[0])) {
          if (value.length > 0)
            responseAddress.push(value);

        }
        responseAddress.reverse();
        for (let value of responseAddress) {
          this.address += value + ", ";
        }
        this.address = this.address.slice(0, -2);
      })
      .catch((error: any) => {
        this.address = "Address Not Available!";
      });
  }

  addMarkerCurrentPos() {
    this.geolocation.getCurrentPosition().then((resp) => {
      const icon = "https://img.icons8.com/dusk/64/000000/street-view.png";
      const animation = google.maps.Animation.DROP;
      const position = new google.maps.LatLng(resp.coords.latitude, resp.coords.longitude);
      const marker = new google.maps.Marker({ position, title: 'Estás aquí!', animation: animation, icon: icon });
      marker.setMap(this.map);
    });
  }

  
  getMarkers() {
    // tslint:disable-next-line:variable-name
    for (let _i = 0; _i < this.places.length; _i++) {
      if (_i > 0) {
        console.log(this.places.length);
        this.addMarkersToMap(this.places[_i]);
      }
    }
  }

  addMarkersToMap(place) {
    const position = new google.maps.LatLng(place.latitude, place.longitude);
    const placeMarker = new google.maps.Marker({ position, title: place.name });
    placeMarker.setMap(this.map);
  }
}
