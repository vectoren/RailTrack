import { Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AlertService } from '../../core/services/alert.service';
import { ReportService } from '../../core/services/report.service';
import { Urgency } from '../../core/models/report.model';

@Component({
  selector: 'app-home-page',
  imports: [RouterLink],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {
  private alertService = inject(AlertService);
  private reportService = inject(ReportService);

  ngOnInit(){
    this.alertService.fetchAlerts();
    this.reportService.fetchReports();
  }

  // Sygnał obliczeniowy zliczający sumę krytycznych zdarzeń
  urgentCount = computed(() => {
    const urgentAlerts = this.alertService.alerts()
      .filter(a => a.urgency == Urgency.IMMEDIATE).length;

    // Filtrujemy zgłoszenia o statusie IMMEDIATE (0)
    const urgentReports = this.reportService.reports()
      .filter(r => r.urgency == Urgency.IMMEDIATE).length;

    return urgentAlerts + urgentReports;
  });
}
