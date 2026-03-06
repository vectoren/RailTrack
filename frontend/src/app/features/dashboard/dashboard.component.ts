import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { GaugeComponent } from "./gauge/gauge.component";
import { TrainService } from '../../core/services/train.service';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  imports: [GaugeComponent, NgClass],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  trainService = inject(TrainService);
  ngOnInit(): void {
    this.trainService.loadTrains();
  }
  // Funkcja pomocnicza do liczenia procentów
  private calculateStatus(status: string) {
    const all = this.trainService.trains();
    if (all.length === 0) return 0;
    const count = all.filter(t => t.status === status).length;
    return Math.round((count / all.length) * 100);
  }

  alerts = signal<{ trainName: string, statusMessage: string, status: string }[]>([
    { trainName: "ED250-001", statusMessage: "Przekroczono limit kilometrów (wymagany przegląd)", status: "high" },
    { trainName: "Griffin E4MSU", statusMessage: "Zaplanowano rutynowy serwis olejowy", status: "medium" },
    { trainName: "Dragon 2", statusMessage: "Krytyczna awaria układu hamulcowego", status: "high" },
    { trainName: "Elf II", statusMessage: "Aktualizacja oprogramowania systemowego", status: "low" },
    { trainName: "Vectron MS", statusMessage: "Niskie ciśnienie w zbiorniku głównym", status: "medium" },
    { trainName: "Dart ED161", statusMessage: "Pomyślnie zakończono testy statyczne", status: "success" },
    { trainName: "Husarz EU44", statusMessage: "Wykryto nienaturalne wibracje zestawu kołowego", status: "high" },
    { trainName: "Impuls 45WE", statusMessage: "Wymagana kalibracja klimatyzacji kabiny", status: "low" },
    { trainName: "Traxx DC3", statusMessage: "Błąd synchronizacji modułu GPS", status: "medium" },
    { trainName: "Flirt 3", statusMessage: "Pociąg gotowy do włączenia do eksploatacji", status: "success" }
  ]);



  activePercent = computed(() => this.calculateStatus('active'));
  standbyPercent = computed(() => this.calculateStatus('standby'));
  maintPercent = computed(() => this.calculateStatus('maintenance'));
  oosPercent = computed(() => this.calculateStatus('out_of_service'));
}
