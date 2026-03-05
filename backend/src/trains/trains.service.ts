import { Injectable, NotFoundException } from '@nestjs/common';
import { Train } from './train.entity';

@Injectable()
export class TrainsService {
  // Our "In-Memory" Database
  private trains: Train[] = [
    { id: 1, name: 'Pendolino ED250', type: 'High-speed', status: 'active', mileage: 125000 },
    { id: 2, name: 'Dragon 2', type: 'Freight', status: 'standby', mileage: 45000 },
    { id: 3, name: 'Dart Pesa', type: 'Intercity', status: 'maintenance', mileage: 89000 },
    { id: 4, name: 'Elf 2', type: 'Intercity', status: 'out_of_service', mileage: 689000 },
    { id: 5, name: 'ET-41', type: 'Freight', status: 'out_of_service', mileage: 1890000 },
  ];

  findAll(): Train[] {
    return this.trains;
  }

  findOne(id: number): Train {
    const train = this.trains.find(t => t.id === id);
    if (!train) throw new NotFoundException(`Train with ID ${id} not found`);
    return train;
  }

  create(newTrain: Partial<Train>): Train {
    const id = this.trains.length + 1;
    const train = { id, ...newTrain } as Train;
    this.trains.push(train);
    return train;
  }

  delete(id: number): boolean {
    const index = this.trains.findIndex(t => t.id === id);
    if (index === -1) return false;
    this.trains.splice(index, 1);
    return true;
  }
}