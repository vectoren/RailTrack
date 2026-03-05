import { Routes } from '@angular/router';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { ErrorPageComponent } from './features/error-page/error-page.component';
import { TrainListComponent } from './features/train-list/train-list.component';
import { MapViewComponent } from './features/map-view/map-view.component';

export const routes: Routes = [
    {path: '', component: DashboardComponent},
    {path: 'train-list', component: TrainListComponent},
    {path: 'map-view', component: MapViewComponent},
    {path: '**', component: ErrorPageComponent}
];
