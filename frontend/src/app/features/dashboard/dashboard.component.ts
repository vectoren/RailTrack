import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { GaugeComponent } from "./gauge/gauge.component";
import { TrainService } from '../../core/services/train.service';
import { NgClass } from '@angular/common';
import { AlertService } from '../../core/services/alert.service';

@Component({
  selector: 'app-dashboard',
  imports: [GaugeComponent, NgClass],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  trainService = inject(TrainService);
  alertService = inject(AlertService);
  alerts = this.alertService.alerts;
  ngOnInit(): void {
    this.trainService.loadTrains();
    this.alertService.fetchAlerts();
  }
  // Funkcja pomocnicza do liczenia procentów
  private calculateStatus(status: string) {
    const all = this.trainService.trains();
    if (all.length === 0) return 0;
    const count = all.filter(t => t.status === status).length;
    return Math.round((count / all.length) * 100);
  }



  activePercent = computed(() => this.calculateStatus('active'));
  standbyPercent = computed(() => this.calculateStatus('standby'));
  maintPercent = computed(() => this.calculateStatus('maintenance'));
  oosPercent = computed(() => this.calculateStatus('out_of_service'));
}
