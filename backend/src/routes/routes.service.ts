import { Injectable } from '@nestjs/common';
import { TrainRoute } from './route.entity';

@Injectable()
export class RoutesService {
  private routes: TrainRoute[] = [
    {
      id: 1,
      trainId: 101,
      lineName: 'Main Line Blue',
      lineColor: '#3498db',
      currentPos: 45, 
      path: [
        { x: 50, y: 300, stationName: 'A' },   
        { x: 200, y: 300 },                   
        { x: 350, y: 150, stationName: 'B' }, 
        { x: 600, y: 150, stationName: 'C' }
      ]
    },
    {
      id: 2,
      trainId: 101,
      lineName: 'Main Line Red',
      lineColor: '#db3434ff',
      currentPos: 45, 
      path: [
        { x: 600, y: 150, stationName: 'A' },  
        { x: 350, y: 150, stationName: 'B' },  
        { x: 200, y: 300 },                   
        { x: 50, y: 300, stationName: 'C' }
      ]
    },
    {
      id: 3,
      trainId: 101,
      lineName: 'Main Line Orange',
      lineColor: '#db7f34ff',
      currentPos: 45, 
      path: [
        { x: 600, y: 150, stationName: 'A' },  
        { x: 350, y: 150, stationName: 'B' },  
        { x: 200, y: 300 },                   
        { x: 50, y: 300, stationName: 'C' }
      ]
    }
  ];

  findAll() { return this.routes; }
  
  findByTrainId(trainId: number) {
    return this.routes.find(r => r.trainId === trainId);
  }
}