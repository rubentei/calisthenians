import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { HomePage } from './home.page';
import { MapsPageModule } from './maps/maps.module';



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
      }
    ])
  ],
  declarations: [HomePage],
  schemas: []
})
export class HomePageModule {}
