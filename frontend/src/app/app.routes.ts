import { Routes } from '@angular/router';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { ErrorPageComponent } from './features/error-page/error-page.component';
import { TrainListComponent } from './features/train-list/train-list.component';
import { MapViewComponent } from './features/map-view/map-view.component';
import { HomePageComponent } from './features/home-page/home-page.component';
import { DetailsPageComponent } from './features/details-page/details-page.component';

export const routes: Routes = [
    {path: '', component: HomePageComponent, title: 'RailTrack'},
    {path: 'dashboard', component: DashboardComponent, title: 'Dashboard'},
    {path: 'train-list', component: TrainListComponent, title: 'Train List'},
    {path: 'train-list/details/:id', component: DetailsPageComponent, title: 'Details'},
    {path: 'map-view', component: MapViewComponent, title: 'Interactive Map'},
    {path: '**', component: ErrorPageComponent, title: '404 Derailed'}
];
