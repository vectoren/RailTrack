import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { TrainService } from '../../core/services/train.service';
import { CommonModule } from '@angular/common';
import { Train } from '../../core/models/train.model';
import { MileagePipe } from "../../core/pipes/mileage.pipe";
import { RouterLink } from "@angular/router";


@Component({
  selector: 'app-train-list',
  imports: [CommonModule, MileagePipe, RouterLink],
  templateUrl: './train-list.component.html',
  styleUrl: './train-list.component.css'
})
export class TrainListComponent implements OnInit {
  public trainService = inject(TrainService);
  searchQuery = signal('');

  filteredTrains = computed(() => {
    const query = this.searchQuery().toLowerCase();
    const trains = this.trainService.trains();

    if (!query) return trains;

    return trains.filter(t =>
      t.name.toLowerCase().includes(query) ||
      t.type.toLowerCase().includes(query)
    );
  });

  ngOnInit(): void {
    this.trainService.loadTrains();
  }

  onSearchChange(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.searchQuery.set(value);
  }

  getStatusLabel(status: string): string {
    const labels: Record<string, string> = {
      'active': 'W trasie',
      'standby': "Postój",
      'maintenance': 'Serwis',
      'out_of_service': 'Wyłączony'
    };
    return labels[status] || status;
  }

  getLatestMaintenanceDate(train: Train): string | null {
    if (!train.serviceHistory || train.serviceHistory.length === 0) {
      return null;
    }

    // Sortujemy daty i bierzemy pierwszą (najnowszą)
    const dates = train.serviceHistory.map(e => new Date(e.date).getTime());
    const latestTimestamp = Math.max(...dates);

    return new Date(latestTimestamp).toString();
  }
}
