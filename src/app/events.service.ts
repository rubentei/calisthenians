import { Injectable } from '@angular/core';
import { EventItem } from './event-item';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  url = '';
  apiKey = ''; // <-- Enter your own key here!

private events: Array<EventItem> = [{
  id: '1',
  date: new Date(),
  description: 'lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum',
  members: ['1', '2'],
  creator: '1'
},
{
  id: '2',
  date: new Date(),
  description: 'lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum',
  members: ['1', '2', '3'],
  creator: '1'
},
{
  id: '3',
  date: new Date(),
  description: 'lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum',
  members: ['1', '2', '4'],
  creator: '1'
}];


  constructor(private http: HttpClient) { }

  // public getEvents(id): Array<EventItem> {
  //   // return this.http.get(`${this.url}?i=${id}&plot=full&apikey=${this.apiKey}`); // aqui va la url
  // }
}
