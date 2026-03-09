import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TrainRoute } from './route.entity';

@Injectable()
export class RoutesService {
  constructor(
    @InjectRepository(TrainRoute)
    private readonly routeRepo: Repository<TrainRoute>
  ) {}

  // Pobiera wszystkie trasy
  async findAll(): Promise<TrainRoute[]> {
    return await this.routeRepo.find();
  }

  // Pobiera trasę przypisaną do konkretnego pociągu
  async findByTrainId(trainId: number): Promise<TrainRoute> {
    const route = await this.routeRepo.findOne({ 
      where: { trainId } 
    });
    
    if (!route) {
      throw new NotFoundException(`Nie znaleziono trasy dla pociągu o ID ${trainId}`);
    }
    
    return route;
  }

  // Aktualizuje postęp pociągu na trasie (0-100%)
  async updateProgress(id: number, progress: number): Promise<void> {
    const result = await this.routeRepo.update(id, { currentPos: progress });
    
    if (result.affected === 0) {
      throw new NotFoundException(`Nie znaleziono trasy o ID ${id} do aktualizacji`);
    }
  }
}