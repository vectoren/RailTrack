import { Module } from '@nestjs/common';
import { RoutesController } from './routes.controller';
import { RoutesService } from './routes.service';
import { TrainRoute } from './route.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([TrainRoute])],
  controllers: [RoutesController],
  providers: [RoutesService],
  exports: [RoutesService] // Pozwala innym modułom korzystać z tych danych
})
export class RoutesModule {}