import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { EventCardPage } from './event-card.page';
import { EventsListPageModule } from '../events-list/events-list.module';

const routes: Routes = [
  {
    path: '',
    component: EventCardPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    EventsListPageModule,
  ],
  declarations: [EventCardPage]
})
export class EventCardPageModule {}
