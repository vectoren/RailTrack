import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TrainsModule } from './trains/trains.module';
import { RoutesModule } from './routes/routes.module';
import { AlertsModule } from './alerts/alerts.module';

@Module({
  imports: [
    TrainsModule,
    RoutesModule,
    AlertsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
