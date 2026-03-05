import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Train } from '../models/train.model';

@Injectable({
  providedIn: 'root'
})
export class TrainService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/api/trains'; 


  #trains = signal<Train[]>([]); 
  trains = this.#trains.asReadonly();

  loadTrains() {
    this.http.get<Train[]>(this.apiUrl).subscribe(data => {
      this.#trains.set(data);
    });
  }

  addTrain(train: Partial<Train>) {
    return this.http.post<Train>(this.apiUrl, train).subscribe(newTrain => {
      this.#trains.update(current => [...current, newTrain]);
    });
  }
  
}
