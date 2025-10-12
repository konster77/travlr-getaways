import { Routes } from '@angular/router';
import { TripList } from './components/trip-list/trip-list';
import { TripAdd } from './components/trip-add/trip-add';
import { TripEdit } from './components/trip-edit/trip-edit';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'trips' },
  { path: 'trips', component: TripList },
  { path: 'trips/add', component: TripAdd },
  { path: 'trips/:code/edit', component: TripEdit },
  { path: '**', redirectTo: 'trips' }
];
