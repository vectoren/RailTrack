import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { GaugeComponent } from "./gauge/gauge.component";
import { TrainService } from '../../core/services/train.service';
import { NgClass } from '@angular/common';
import { AlertService } from '../../core/services/alert.service';
import { ReportService } from '../../core/services/report.service';
import { Report, Urgency } from '../../core/models/report.model';

@Component({
  selector: 'app-dashboard',
  imports: [GaugeComponent, NgClass],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  trainService = inject(TrainService);
  alertService = inject(AlertService);
  reportService = inject(ReportService);
  ngOnInit(): void {
    this.trainService.loadTrains();
    this.alertService.fetchAlerts();
    this.reportService.fetchReports();
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

  sortedAlerts = computed(() =>{
    return [...this.alertService.alerts()].sort((a, b) => a.urgency - b.urgency)
  })

  sortedReports = computed(() => {
    return [...this.reportService.reports()].sort((a, b) => a.urgency - b.urgency);
  });
  // Mapowanie Enuma na tekst i style
  getUrgencyLabel(urgency: Urgency): string {
    switch (urgency) {
      case Urgency.IMMEDIATE: return 'Natychmiast';
      case Urgency.HIGH: return 'Wysoki';
      case Urgency.MODERATE: return 'Średni';
      case Urgency.LOW: return 'Niski';
      default: return 'Nieznany';
    }
  }

  getUrgencyClass(urgency: Urgency): string {
    switch (urgency) {
      case Urgency.IMMEDIATE: return 'urg-immediate';
      case Urgency.HIGH: return 'urg-high';
      case Urgency.MODERATE: return 'urg-moderate';
      case Urgency.LOW: return 'urg-low';
      default: return '';
    }
  }
}
