import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { MaintenanceEvent, Train } from '../models/train.model';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class TrainService {
  private http = inject(HttpClient);
  private apiUrl = '/api/trains'; 
  // Zakładamy, że endpoint dla historii to /api/maintenance lub relacja pociągu
  private maintenanceUrl = '/api/maintenance'; 

  #trains = signal<Train[]>([]); 
  trains = this.#trains.asReadonly();

  loadTrains() {
    this.http.get<Train[]>(this.apiUrl).subscribe(data => {
      this.#trains.set(data);
    });
  }

  getTrainById(id: number): Observable<Train> {
    return this.http.get<Train>(`${this.apiUrl}/${id}`);
  }

  // NOWOŚĆ: Dodawanie wpisu serwisowego
  addMaintenanceEvent(event: Partial<MaintenanceEvent>) {
    return this.http.post<MaintenanceEvent>(this.maintenanceUrl, event);
  }

  addTrain(train: Partial<Train>) {
    return this.http.post<Train>(this.apiUrl, train).subscribe(newTrain => {
      this.#trains.update(current => [...current, newTrain]);
    });
  }
}