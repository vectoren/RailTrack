import { Injectable } from '@nestjs/common';
import { TrainsService } from '../trains/trains.service';
import { Urgency } from 'src/reports/report.entity';

@Injectable()
export class AlertsService {
  // Wstrzykujemy serwis pociągów, aby mieć dostęp do ich nazw
  constructor(private trainsService: TrainsService) { }

  private alerts = [
    { id: 1, trainId: 101, statusMessage: "Krytyczne przegrzanie silnika trakcyjnego - wymagane natychmiastowe zatrzymanie.", urgency: Urgency.IMMEDIATE },
    { id: 2, trainId: 103, statusMessage: "Wykryto spadek ciśnienia w układzie hamulcowym. Sprawdź szczelność przewodów.", urgency: Urgency.HIGH },
    { id: 3, trainId: 105, statusMessage: "Planowana wymiana klocków hamulcowych za 500km. Zarezerwuj termin w serwisie.", urgency: Urgency.MODERATE },
    { id: 4, trainId: 102, statusMessage: "Aktualizacja map systemu GPS została pobrana i oczekuje na instalację.", urgency: Urgency.LOW },
    { id: 5, trainId: 107, statusMessage: "Nieprawidłowe parametry napięcia na odbieraku prądu (pantograf).", urgency: Urgency.HIGH },
    { id: 6, trainId: 109, statusMessage: "Wykryto zablokowanie czujnika zbliżeniowego w drzwiach wejściowych wagonu nr 2.", urgency: Urgency.MODERATE },
    { id: 7, trainId: 110, statusMessage: "Ostrzeżenie o oblodzeniu sieci trakcyjnej na bieżącym odcinku trasy.", urgency: Urgency.HIGH },
    { id: 8, trainId: 104, statusMessage: "System klimatyzacji wymaga rutynowej wymiany filtrów przeciwpyłkowych.", urgency: Urgency.LOW },
    { id: 9, trainId: 106, statusMessage: "Poważny błąd komunikacji z systemem ETCS - przejście w tryb awaryjny.", urgency: Urgency.IMMEDIATE },
    { id: 10, trainId: 108, statusMessage: "Niski poziom płynu do spryskiwaczy szyb czołowych kabiny maszynisty.", urgency: Urgency.LOW }
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