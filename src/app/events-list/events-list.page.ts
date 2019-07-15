import { Component, OnInit } from '@angular/core';
import { EventsService } from '../events.service';
import { EventItem } from '../event-item';

@Component({
  selector: 'app-events-list',
  templateUrl: './events-list.page.html',
  styleUrls: ['./events-list.page.scss'],
})
export class EventsListPage implements OnInit {

  public eventList: Array<EventItem>;

  constructor(private eventsService: EventsService) { 

  }

  ngOnInit() {
    this.getEventList();
  }

  public getEventList() {
    return this.eventList = this.eventsService.getEvents();
  }

}

