import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TrainsModule } from './trains/trains.module';
import { RoutesModule } from './routes/routes.module';

@Module({
  imports: [
    TrainsModule,
    RoutesModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
