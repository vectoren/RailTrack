import { Injectable } from '@nestjs/common';
import { TrainsService } from '../trains/trains.service';

@Injectable()
export class AlertsService {
  // Wstrzykujemy serwis pociągów, aby mieć dostęp do ich nazw
  constructor(private trainsService: TrainsService) { }

  private alerts = [
    { id: 1, trainId: 101, statusMessage: "Przekroczono limit kilometrów (wymagany przegląd)", status: "high" },
    { id: 2, trainId: 103, statusMessage: "Zaplanowano rutynowy serwis olejowy", status: "medium" },
    { id: 3, trainId: 105, statusMessage: "Krytyczna awaria układu hamulcowego", status: "high" },
    { id: 4, trainId: 106, statusMessage: "Aktualizacja oprogramowania systemowego", status: "low" },
    { id: 5, trainId: 109, statusMessage: "Niskie ciśnienie w zbiorniku głównym", status: "medium" },
    { id: 6, trainId: 102, statusMessage: "Pomyślnie zakończono testy statyczne", status: "success" },
    { id: 7, trainId: 107, statusMessage: "Wykryto nienaturalne wibracje zestawu kołowego", status: "high" },
    { id: 8, trainId: 108, statusMessage: "Wymagana kalibracja klimatyzacji kabiny", status: "low" },
    { id: 9, trainId: 110, statusMessage: "Błąd synchronizacji modułu GPS", status: "medium" },
    { id: 10, trainId: 104, statusMessage: "Pociąg gotowy do włączenia do eksploatacji", status: "success" }
  ];

  findAll() {
    // Pobieramy aktualną listę pociągów z drugiego serwisu
    const allTrains = this.trainsService.findAll();

    // Mapujemy alerty, dodając trainName na podstawie trainId
    return this.alerts.map(alert => {
      const foundTrain = allTrains.find(t => t.id === alert.trainId);

      return {
        ...alert,
        // Jeśli znajdzie pociąg, bierze jego name, w przeciwnym razie daje fallback
        trainName: foundTrain ? foundTrain.name : `Pociąg #${alert.trainId}`
      };
    });
  }
}