import { Routes } from '@angular/router';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { ErrorPageComponent } from './features/error-page/error-page.component';
import { TrainListComponent } from './features/train-list/train-list.component';
import { MapViewComponent } from './features/map-view/map-view.component';
import { HomePageComponent } from './features/home-page/home-page.component';

export const routes: Routes = [
    {path: '', component: HomePageComponent},
    {path: 'dashboard', component: DashboardComponent},
    {path: 'train-list', component: TrainListComponent},
    {path: 'map-view', component: MapViewComponent},
    {path: '**', component: ErrorPageComponent}
];
