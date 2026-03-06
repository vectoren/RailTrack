import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Train } from '../models/train.model';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class TrainService {
  private http = inject(HttpClient);
  private apiUrl = '/api/trains'; 


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

  addTrain(train: Partial<Train>) {
    return this.http.post<Train>(this.apiUrl, train).subscribe(newTrain => {
      this.#trains.update(current => [...current, newTrain]);
    });
  }
  
}
