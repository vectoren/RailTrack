import { Component, inject, OnInit, signal } from '@angular/core';
import { TrainService } from '../../core/services/train.service';
import { Train } from '../../core/models/train.model';
import { Router, ActivatedRoute } from '@angular/router';
import { MileagePipe } from "../../core/pipes/mileage.pipe";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-details-page',
  imports: [MileagePipe, CommonModule],
  templateUrl: './details-page.component.html',
  styleUrl: './details-page.component.css'
})
export class DetailsPageComponent implements OnInit {
  public trainService = inject(TrainService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  
  selectedTrain = signal<Train | null>(null);
  
  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get("id"));
    this.trainService.getTrainById(id).subscribe({
      next: (train) => {
        this.selectedTrain.set(train);
        console.log('Pobrano szczegóły:', train);
      },
      error: (err) => console.error('Nie udało się pobrać pociągu', err)
    });
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

  goBack(){
    this.selectedTrain.set(null);
    this.router.navigate(['/train-list'])
  }
}
