import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { RoutesService } from './routes.service';

@Controller('api/routes')
export class RoutesController {
  constructor(private readonly routesService: RoutesService) {}

  @Get()
  getAllRoutes() {
    return this.routesService.findAll();
  }

  @Get('train/:trainId')
  getRouteByTrain(@Param('trainId', ParseIntPipe) trainId: number) {
    return this.routesService.findByTrainId(trainId);
  }
}