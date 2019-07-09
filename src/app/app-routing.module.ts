import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: './home/home.module#HomePageModule' },
<<<<<<< HEAD
  { path: 'maps', loadChildren: './home/maps.module#MapsPageModule' },
=======
  { path: 'maps', loadChildren: './home/maps/maps.module#MapsPageModule' },
>>>>>>> 882afbf3d3313226f5b812833a1a6aecd2fad7be
  { path: 'profile', loadChildren: './profile/profile.module#ProfilePageModule' },
  { path: 'auth', loadChildren: './auth/auth.module#AuthPageModule' },
  { path: 'events-list', loadChildren: './events-list/events-list.module#EventsListPageModule' },
  // { path: 'login-form', loadChildren: './login-form/login-form.module#LoginFormPageModule' },
  { path: 'register-form', loadChildren: './register-form/register-form.module#RegisterFormPageModule' },
  { path: 'events', loadChildren: './events/events.module#EventsPageModule' },
  { path: 'add-event', loadChildren: './add-event/add-event.module#AddEventPageModule' },
  { path: 'event-card', loadChildren: './event-card/event-card.module#EventCardPageModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
