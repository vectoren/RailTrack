import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TrainsModule } from './trains/trains.module';

@Module({
  imports: [
    TrainsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
