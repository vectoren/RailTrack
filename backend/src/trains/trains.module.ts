import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TrainsService } from './trains.service';
import { TrainsController } from './trains.controller';
import { Train } from './train.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Train])], // Rejestracja encji
  providers: [TrainsService],
  controllers: [TrainsController],
})
export class TrainsModule {}