import { Controller, Get } from '@nestjs/common';
import { AlertsService } from './alerts.service';

@Controller('api/alerts') // Prefiks dla wszystkich endpointów w tym kontrolerze
export class AlertsController {
  constructor(private readonly alertsService: AlertsService) { }

  @Get()
  async getAllAlerts() {
    return await this.alertsService.findAll(); // Czekamy na dane z bazy
  }
}