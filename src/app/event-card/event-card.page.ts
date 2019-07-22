import { Component, OnInit } from '@angular/core';
import { EventsService } from '../events.service';

@Component({
  selector: 'app-event-card',
  templateUrl: './event-card.page.html',
  styleUrls: ['./event-card.page.scss'],
})
export class EventCardPage implements OnInit {

  results: Array<any>

  constructor(private EventsService: EventsService) { }

  ngOnInit() {
  }

  gettingEvent(){
    // this.results = this.EventsService.getEvents(this.results);
  }

}
