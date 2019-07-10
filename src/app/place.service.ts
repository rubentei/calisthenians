import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlaceService {

  private places: any = [
    { latitude: 40.46628036112748, longitude: -3.648011692639075, title: 'PARQUE1' }
  ]
  static places: any;
  constructor() { }

  public getPlaces(): any {

    return this.places;
  }
}
