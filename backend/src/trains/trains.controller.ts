import { Controller, Get, Post, Body, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { TrainsService } from './trains.service';
import { Train } from './train.entity';

@Controller('api/trains')
export class TrainsController {
  constructor(private readonly trainsService: TrainsService) {}

  @Get()
  getAll() {
    return this.trainsService.findAll();
  }

  @Get(':id')
  getOne(@Param('id', ParseIntPipe) id: number) {
    return this.trainsService.findOne(id);
  }

  @Post()
  create(@Body() body: Partial<Train>) {
    return this.trainsService.create(body);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.trainsService.delete(id);
  }
}