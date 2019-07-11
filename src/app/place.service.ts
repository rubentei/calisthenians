import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlaceService {

  private places: any = [
    { latitude: 40.46628036112748, longitude: -3.648011692639075, title: 'PARQUE1', id:'toli' },
    { latitude: 40.4633625, longitude: -3.6566220, title: 'PARQUE2', id:'amigo' },
    { latitude: 40.5538901, longitude: -3.6090457, title: 'PARQUE3', id:'ojo' }
  ]
  static places: any;
  constructor() { }

  public getPlaces(): any {

    return this.places;
  }
}
