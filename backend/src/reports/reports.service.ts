import { Injectable } from '@nestjs/common';
import { Report, Urgency } from './report.entity';

@Injectable()
export class ReportsService {
  private reports: Report[] = [
    { id: 1, reporterId: 10, content: "Wykryto uszkodzenie sieci trakcyjnej na odcinku Warszawa-Zachodnia. Ryzyko zerwania.", urgency: Urgency.IMMEDIATE },
    { id: 2, reporterId: 15, content: "Nieprawidłowe działanie systemu biletowego w wagonie nr 4. Wymagany restart modułu.", urgency: Urgency.LOW },
    { id: 3, reporterId: 22, content: "Zgłoszenie pęknięcia szyby w kabinie maszynisty (odprysk). Można kontynuować bieg.", urgency: Urgency.MODERATE },
    { id: 4, reporterId: 10, content: "Pociąg Pendolino ED250-001 zgłasza błąd czujnika temperatury wózka jezdnego.", urgency: Urgency.HIGH },
    { id: 5, reporterId: 30, content: "Brak oświetlenia w przejściu między wagonami 2 i 3.", urgency: Urgency.LOW },
    { id: 6, reporterId: 12, content: "Zablokowane drzwi wejściowe (lewa strona) w pociągu Elf 2. Wyłączone z użytku.", urgency: Urgency.MODERATE },
    { id: 7, reporterId: 5, content: "Osoba nieuprawniona na torowisku w pobliżu stacji Konin. Ruch wstrzymany.", urgency: Urgency.IMMEDIATE },
    { id: 8, reporterId: 18, content: "Niska wydajność klimatyzacji w strefie Wars. Pasażerowie skarżą się na temperaturę.", urgency: Urgency.MODERATE },
    { id: 9, reporterId: 25, content: "Przekroczenie dopuszczalnej masy składu towarowego (Dragon 2). Wymagane przepięcie.", urgency: Urgency.HIGH },
    { id: 10, reporterId: 14, content: "Uzupełniono płyn do spryskiwaczy i sprawdzone wycieraczki. Gotowy do trasy.", urgency: Urgency.LOW }
  ];
  findAll() { return this.reports; }

  findByID(Id: number) {
    return this.reports.find(r => r.id === Id);
  }
}