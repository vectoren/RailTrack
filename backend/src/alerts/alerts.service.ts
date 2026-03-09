import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Alert } from './alert.entity'; // Zaimportuj swoją encję

@Injectable()
export class AlertsService {
  constructor(
    @InjectRepository(Alert)
    private readonly alertsRepository: Repository<Alert>,
  ) {}

  async findAll() {
    // Pobieramy alerty z bazy, automatycznie dołączając dane pociągu (JOIN)
    const alerts = await this.alertsRepository.find({
      relations: ['train'], // Musisz mieć zdefiniowaną relację @ManyToOne w encji Alert
      order: {
        urgency: 'ASC', // Od razu sortujemy po pilności
      },
    });

    // Mapujemy dane, aby zachować strukturę, której oczekuje Frontend
    return alerts.map((alert) => ({
      id: alert.id,
      trainId: alert.train ? alert.train.id : null,
      statusMessage: alert.statusMessage,
      urgency: alert.urgency,
      // Wyciągamy name z relacji train zamiast szukać w innym serwisie
      trainName: alert.train ? alert.train.name : `Nieznany pociąg`,
    }));
  }
}