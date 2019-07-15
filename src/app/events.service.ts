import { Injectable } from '@angular/core';
import { EventItem } from './event-item';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

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


  constructor() { }

  public getEvents(): Array<EventItem> {
    return this.events;
  }
}
