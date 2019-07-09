import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { HomePage } from './home.page';
import { MapsPageModule } from './maps/maps.module';
import { MapsPage } from './maps/maps.page';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MapsPageModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomePage
      },
      { path: '/maps',
        component: MapsPage}
    ])
  ],
  declarations: [HomePage],
  schemas: []
})
export class HomePageModule {}
