import { Component, OnInit } from '@angular/core';
import {
  ToastController,
  Platform,
  LoadingController,
  NavController
} from '@ionic/angular';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  Marker,
  GoogleMapsAnimation,
  MyLocation,
  LocationService,
  GoogleMapOptions
} from '@ionic-native/google-maps';
import { PlaceService } from 'src/app/place.service';
import { NavOutlet } from '@ionic/core';

@Component({
  selector: 'app-maps',
  templateUrl: './maps.page.html',
  styleUrls: ['./maps.page.scss'],
})

export class MapsPage implements OnInit {

  map: GoogleMap;
  loading: any;
  places = [];

  constructor(
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    private platform: Platform,
    private placeService: PlaceService,
    private route: NavController) { }

  async ngOnInit() {
    // Since ngOnInit() is executed before `deviceready` event,
    // you have to wait the event.
    await this.platform.ready();
    await this.loadmap();
  }

  loadmap() {
    LocationService.getMyLocation().then((myLocation: MyLocation) => {
      console.log(myLocation.latLng);
      let options: GoogleMapOptions = {
        camera: {
          target: myLocation.latLng,
          zoom: 13,
          tilt: 30
        }
      };
      this.map = GoogleMaps.create('map_canvas', options);
      this.map.addMarker({
        'position': { lat: myLocation.latLng.lat, lng: myLocation.latLng.lng },
        'icon': "https://img.icons8.com/dusk/64/000000/street-view.png",
        'animation': GoogleMapsAnimation.DROP,
        'title': 'Este eres tú'
      }).then((marker: Marker) => {
        marker.showInfoWindow();
      });

      this.getMarkers();
    })
      .catch(err => {
        this.showToast(err.error_message);
      });
  }


  getMarkers() {
    this.places = this.placeService.getPlaces();
    const places = this.places;
    for (let place of places) {
      this.addMarkersToMap(place);
    }
  }

  addMarkersToMap(place) {
    this.map.addMarker({
      'position': { lat: place.latitude, lng: place.longitude },
      'icon': "https://img.icons8.com/nolan/64/000000/marker.png",
      'animation': GoogleMapsAnimation.BOUNCE,
      'title': place.title,

    }).then((marker: Marker) => {
      marker.addEventListener(GoogleMapsEvent.MARKER_CLICK).subscribe(() => {
        this.route.navigateRoot('/events' + place.id);
        marker.showInfoWindow();
      });
    });
  }
  
  async showToast(message: string) {
    let toast = await this.toastCtrl.create({
      message: message,
      duration: 2000,
      position: 'middle'
    });

    toast.present();
  }
}




// import { Component, ViewChild, ElementRef } from '@angular/core';

// import { Geolocation } from '@ionic-native/geolocation/ngx';
// import { NativeGeocoder, NativeGeocoderReverseResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';
// import { MarkerOptions, LatLng, Marker, GoogleMapsEvent } from '@ionic-native/google-maps';
// import { PlaceService } from 'src/app/place.service';

// declare var google;

// @Component({
//   selector: 'app-maps',
//   templateUrl: './maps.page.html',
//   styleUrls: ['./maps.page.scss'],
// })
// export class MapsPage {
//   public places = [];

//   @ViewChild('map') mapElement: ElementRef;
//   map: any;
//   address: string;

//   constructor(
//     private geolocation: Geolocation,
//     private nativeGeocoder: NativeGeocoder,
//     private placeService: PlaceService) {
//   }


//   ngOnInit() {
//     this.loadMap();
//     this.places = this.placeService.getPlaces();
//     this.getMarkers();
//   }

//   loadMap() {
//     this.geolocation.getCurrentPosition().then((resp) => {
//       let latLng = new google.maps.LatLng(resp.coords.latitude, resp.coords.longitude);
//       let mapOptions = {
//         center: latLng,
//         zoom: 13,
//         disableDefaultUI: true,
//         mapTypeId: google.maps.MapTypeId.ROADMAP,
//       }
//       this.getAddressFromCoords(resp.coords.latitude, resp.coords.longitude);

//       this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

//       this.map.addListener('tilesloaded', () => {
//         console.log('accuracy', this.map);
//         this.getAddressFromCoords(this.map.center.lat(), this.map.center.lng())
//         this.addMarkerCurrentPos();
//         this.getMarkers();
//       });
//     }).catch((error) => {
//       console.log('Error getting location', error);
//     });


//   }

//   getAddressFromCoords(lattitude, longitude) {
//     console.log("getAddressFromCoords " + lattitude + " " + longitude);
//     let options: NativeGeocoderOptions = {
//       useLocale: true,
//       maxResults: 5
//     };

//     this.nativeGeocoder.reverseGeocode(lattitude, longitude, options)
//       .then((result: NativeGeocoderReverseResult[]) => {
//         this.address = "";
//         let responseAddress = [];
//         for (let [key, value] of Object.entries(result[0])) {
//           if (value.length > 0)
//             responseAddress.push(value);

//         }
//         responseAddress.reverse();
//         for (let value of responseAddress) {
//           this.address += value + ", ";
//         }
//         this.address = this.address.slice(0, -2);
//       })
//       .catch((error: any) => {
//         this.address = "Address Not Available!";
//       });
//   }

//   addMarkerCurrentPos() {
//     this.geolocation.getCurrentPosition().then((resp) => {
//       const icon = "https://img.icons8.com/dusk/64/000000/street-view.png";
//       const animation = google.maps.Animation.DROP;
//       const position = new google.maps.LatLng(resp.coords.latitude, resp.coords.longitude);
//       const marker = new google.maps.Marker({ position, title: 'Estás aquí!', animation: animation, icon: icon });
//       marker.setMap(this.map);
//     });
//   }

//   getMarkers() {
//     const places = this.places;
//     for (let lugar of places) {
//       this.addMarkersToMap(lugar);
//     }
//   }

//   addMarkersToMap(place) {
//     const position = new google.maps.LatLng(place.latitude, place.longitude);
//     const icon = 'https://img.icons8.com/nolan/64/000000/marker.png';
//     const placeMarker = new google.maps.Marker({ position, title: place.name, icon: icon });
//     placeMarker.setMap(this.map);
//   }
// }

