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
    { id: 101, name: "Pendolino ED250-001", type: "Alstom EMZ", status: 'active', mileage: 125400 },
    { id: 102, name: "Dart ED161", type: "Pesa Bydgoszcz", status: 'active', mileage: 89200 },
    { id: 103, name: "Griffin E4MSU", type: "Newag Lokomotywa", status: 'maintenance', mileage: 45600 },
    { id: 104, name: "Flirt 3", type: "Stadler Polska", status: 'standby', mileage: 67800 },
    { id: 105, name: "Dragon 2", type: "Newag Cargo", status: 'active', mileage: 156000 },
    { id: 106, name: "Elf II", type: "Pesa Regio", status: 'out_of_service', mileage: 32100 },
    { id: 107, name: "Husarz EU44", type: "Siemens EuroSprinter", status: 'active', mileage: 210500 },
    { id: 108, name: "Impuls 45WE", type: "Newag Koleje Dolnośląskie", status: 'maintenance', mileage: 98450 },
    { id: 109, name: "Vectron MS", type: "Siemens Mobility", status: 'standby', mileage: 12400 },
    { id: 110, name: "Traxx DC3", type: "Bombardier/Alstom", status: 'active', mileage: 74300 }

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