import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MaintenanceEvent } from './maintenance-event.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MaintenanceEvent])],
  exports: [TypeOrmModule], // Eksportujemy, żeby SeedService go widział
})
export class MaintenanceModule {}