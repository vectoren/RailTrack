import { HttpClient } from '@angular/common/http';
import { TrainRoute } from '../models/route.model';
import { inject, Injectable, signal } from '@angular/core';


@Injectable({ providedIn: 'root' })
export class RouteService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/api/routes';

  routes = signal<TrainRoute[]>([]);

  fetchRoutes() {
    this.http.get<TrainRoute[]>(this.apiUrl).subscribe(data => this.routes.set(data));
  }
}