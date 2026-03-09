import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Alert } from '../models/alert.model';

@Injectable({
  providedIn: 'root'
})
// alert.service.ts (Angular)
export class AlertService {
  private http = inject(HttpClient);
  alerts = signal<Alert[]>([]);

  fetchAlerts() {
    this.http.get<Alert[]>('/api/alerts').subscribe(data => {
      this.alerts.set(data);
    });
  }
}
