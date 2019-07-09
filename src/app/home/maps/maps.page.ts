import { Component, ViewChild, ElementRef } from '@angular/core';
 
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder, NativeGeocoderReverseResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';
 
declare var google;
 
@Component({
    selector: 'app-maps',
    templateUrl: './maps.page.html',
    styleUrls: ['./maps.page.scss'],
  })
export class MapsPage {
 
  @ViewChild('map') mapElement: ElementRef;
  map: any;
  address:string;
 
  constructor(
    private geolocation: Geolocation,
    private nativeGeocoder: NativeGeocoder) {
  }
 
 
  ngOnInit() {
    this.loadMap();
  }
 
  loadMap() {
    this.geolocation.getCurrentPosition().then((resp) => {
      let latLng = new google.maps.LatLng(resp.coords.latitude, resp.coords.longitude);
      let mapOptions = {
        center: latLng,
        zoom: 14,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }
 
      this.getAddressFromCoords(resp.coords.latitude, resp.coords.longitude);
 
      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
 
      this.map.addListener('tilesloaded', () => {
        console.log('accuracy',this.map);
        this.getAddressFromCoords(this.map.center.lat(), this.map.center.lng())
      });
 
    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }
 
  getAddressFromCoords(lattitude, longitude) {
    console.log("getAddressFromCoords "+lattitude+" "+longitude);
    let options: NativeGeocoderOptions = {
      useLocale: true,
      maxResults: 5
    };
 
    this.nativeGeocoder.reverseGeocode(lattitude, longitude, options)
      .then((result: NativeGeocoderReverseResult[]) => {
        this.address = "";
        let responseAddress = [];
        for (let [key, value] of Object.entries(result[0])) {
          if(value.length>0)
          responseAddress.push(value);
 
        }
        responseAddress.reverse();
        for (let value of responseAddress) {
          this.address += value+", ";
        }
        this.address = this.address.slice(0, -2);
      })
      .catch((error: any) =>{
        this.address = "Address Not Available!";
      });
 
  }
 
 
}

// import { Component, OnInit, ViewChild} from '@angular/core';

// import { Geolocation } from '@ionic-native/geolocation/ngx';
// import { NativeGeocoder, NativeGeocoderReverseResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';
// import {
//   GoogleMaps,
//   GoogleMap,
//   GoogleMapsEvent,
//   GoogleMapOptions,
//   CameraPosition,
//   MarkerOptions,
//   Marker,
//   Environment
// } from '@ionic-native/google-maps';

// declare var google;

// @Component({
//   selector: 'app-maps',
//   templateUrl: './maps.page.html',
//   styleUrls: ['./maps.page.scss'],
// })
// export class MapsPage implements OnInit {
//   map;

//   @ViewChild('mapElement') mapElement;
//   constructor(
//     private geolocation: Geolocation,
//     private nativeGeocoder: NativeGeocoder
//   ) { }

//   ngOnInit() {
 
//   }

//   ngAfterContentInit(): void {
//     this.map = new google.maps.Map(
//       this.mapElement.nativeElement,
//       {
//         center: {lat: -34.397, lng: 150.644},
//         zoom: 8
//       });
//   }

//   ionViewDidLoad() {
//     this.loadMap();
//   }

//   loadMap() {

//     // This code is necessary for browser
//     Environment.setEnv({
//       'API_KEY_FOR_BROWSER_RELEASE': 'AIzaSyDeS0aNeEcW1qeCHJgyEGuVM3E6lH0MjK0',
//       'API_KEY_FOR_BROWSER_DEBUG': 'AIzaSyDeS0aNeEcW1qeCHJgyEGuVM3E6lH0MjK0'
//     });

//     let mapOptions: GoogleMapOptions = {
//       camera: {
//          target: {
//            lat: 43.0741904,
//            lng: -89.3809802
//          },
//          zoom: 18,
//          tilt: 30
//        }
//     };

//     this.map = GoogleMaps.create('map_canvas', mapOptions);

//     let marker: Marker = this.map.addMarkerSync({
//       title: 'Ionic',
//       icon: 'blue',
//       animation: 'DROP',
//       position: {
//         lat: 43.0741904,
//         lng: -89.3809802
//       }
//     });
//     marker.on(GoogleMapsEvent.MARKER_CLICK).subscribe(() => {
//       alert('clicked');
//     });
//   }
// }
