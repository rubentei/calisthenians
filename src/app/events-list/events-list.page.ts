import { Component, OnInit } from '@angular/core';
import { EventsService } from '../events.service';

@Component({
  selector: 'app-events-list',
  templateUrl: './events-list.page.html',
  styleUrls: ['./events-list.page.scss'],
})
export class EventsListPage implements OnInit {

  public eventList: Array<any>;

  constructor(private eventsService: EventsService) { 

  }

  ngOnInit() {
  }
  getEventList= ()=>{
    console.log('Got event list');
  }

}

