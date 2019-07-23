import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Place } from './place';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlaceService {

  private places: Array<any>;

  constructor(private http: HttpClient, private place: Place) { }

  public getPlaces(lng, lat): Observable<any> {
   const query = this.http.get(`http://localhost:3000/places/${lng}/${lat}`);
   return query;
  }
}
