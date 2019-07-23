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
import { Place } from 'src/app/place';

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
    private route: NavController,
    private place: Place) { }

  async ngOnInit() {
    // Since ngOnInit() is executed before `deviceready` event,
    // you have to wait the event.
    await this.platform.ready();
    await this.loadmap();
  }

  loadmap() {
    LocationService.getMyLocation().then((myLocation: MyLocation) => {
      let options: GoogleMapOptions = {
        camera: {
          target: myLocation.latLng,
          zoom: 13,
          tilt: 30
        },
        controls: {
          'zoom': false          // android only
        },
        gestures: {
          scroll: true,
          tilt: true,
          zoom: true,
          rotate: true
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

      this.map.on(GoogleMapsEvent.MAP_CLICK).subscribe((params: any[]) => {
        let latLng = params[0];
    
        this.map.addMarkerSync({
          position: latLng,
          title: latLng,
          animation: GoogleMapsAnimation.DROP
        });
      });    
    })
      .catch(err => {
        this.showToast(err.error_message);
      });
  }


  async getMarkers() {
    var myLocation = await LocationService.getMyLocation();
    var lng = myLocation.latLng.lng;
    var lat = myLocation.latLng.lat;
    const locationsObservable = this.placeService.getPlaces(lng, lat);
    
    locationsObservable.subscribe((placesData: Place[])=> {
      this.places = placesData;
      for(let place of this.places){
        this.addMarkersToMap(place);
      };
    });
  };

  addMarkersToMap(place) {
    this.map.addMarker({
      'position': { lat: place.location.coordinates[1], lng: place.location.coordinates[0] },
      'icon': "https://img.icons8.com/nolan/64/000000/marker.png",
      'animation': GoogleMapsAnimation.BOUNCE,
      'title': place.name,

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
