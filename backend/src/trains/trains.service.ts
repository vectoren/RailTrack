import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Train } from './train.entity';

@Injectable()
export class TrainsService {
  constructor(
    @InjectRepository(Train)
    private readonly trainsRepository: Repository<Train>,
  ) {}

  // Pobiera wszystkie pociągi z bazy
  async findAll(): Promise<Train[]> {
    return await this.trainsRepository.find({
      order: { id: 'ASC' }
    });
  }

  // Szuka pociągu po ID
  async findOne(id: number): Promise<Train> {
    const train = await this.trainsRepository.findOne({ where: { id } });
    if (!train) {
      throw new NotFoundException(`Train with ID ${id} not found`);
    }
    return train;
  }

  // Tworzy i zapisuje nowy pociąg
  async create(newTrain: Partial<Train>): Promise<Train> {
    const train = this.trainsRepository.create(newTrain);
    return await this.trainsRepository.save(train);
  }

  // Usuwa pociąg z bazy
  async delete(id: number): Promise<void> {
    const result = await this.trainsRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Train with ID ${id} not found`);
    }
  }
}