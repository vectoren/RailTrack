import { Controller, Get } from '@nestjs/common';
import { AlertsService } from './alerts.service';

@Controller('api/alerts') // Prefiks dla wszystkich endpointów w tym kontrolerze
export class AlertsController {
  constructor(private readonly alertsService: AlertsService) {}

  @Get()
  getAllAlerts() {
    // Wywołujemy metodę z serwisu, która robi "dummy join" z pociągami
    return this.alertsService.findAll();
  }
}