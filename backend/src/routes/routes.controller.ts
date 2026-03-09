import { Controller, Get, Param, ParseIntPipe, Patch, Body } from '@nestjs/common';
import { RoutesService } from './routes.service';
import { TrainRoute } from './route.entity';

@Controller('api/routes')
export class RoutesController {
  constructor(private readonly routesService: RoutesService) {}

  @Get()
  async findAll(): Promise<TrainRoute[]> {
    return await this.routesService.findAll();
  }

  @Get('train/:trainId')
  async findByTrainId(@Param('trainId', ParseIntPipe) trainId: number): Promise<TrainRoute> {
    return await this.routesService.findByTrainId(trainId);
  }

  @Patch(':id/progress')
  async updateProgress(
    @Param('id', ParseIntPipe) id: number,
    @Body('progress') progress: number,
  ): Promise<void> {
    return await this.routesService.updateProgress(id, progress);
  }
}