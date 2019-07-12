import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
 { path: '', redirectTo: 'home', pathMatch: 'full' },
 { path: 'home', loadChildren: './home/home.module#HomePageModule' },
 { path: 'maps', loadChildren: './home/maps/maps.module#MapsPageModule' },
 { path: 'profile', loadChildren: './profile/profile.module#ProfilePageModule' },
 { path: 'auth', loadChildren: './auth/auth.module#AuthPageModule' },
 { path: 'events', loadChildren: './events/events.module#EventsPageModule' },
 { path: 'add-event', loadChildren: './events/add-event/add-event.module#AddEventPageModule' },
 { path: 'event-card', loadChildren: './event-card/event-card.module#EventCardPageModule' },
];

@NgModule({
 imports: [
   RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
 ],
 exports: [RouterModule]
})
export class AppRoutingModule { }