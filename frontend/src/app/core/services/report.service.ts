import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Report } from '../models/report.model';

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  private httpClient = inject(HttpClient);
  private apiUrl = '/api/reports'; 

  reports = signal<Report[]>([]);
  fetchReports(){
    this.httpClient.get<Report[]>(this.apiUrl).subscribe(data => {
      this.reports.set(data);
    });
  }

}
