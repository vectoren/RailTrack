import { Component, inject, OnInit } from '@angular/core';
import { TrainService } from '../../core/services/train.service';

@Component({
  selector: 'app-train-list',
  imports: [],
  templateUrl: './train-list.component.html',
  styleUrl: './train-list.component.css'
})
export class TrainListComponent implements OnInit {
  public trainService = inject(TrainService);
  ngOnInit(): void {
    this.trainService.loadTrains();
  }
  
}
