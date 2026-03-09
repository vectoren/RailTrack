import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TrainsModule } from './trains/trains.module';
import { RoutesModule } from './routes/routes.module';
import { AlertsModule } from './alerts/alerts.module';
import { ReportsModule } from './reports/reports.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SeedService } from './database/seed.service';
import { TrainRoute } from './routes/route.entity';
import { Alert } from './alerts/alert.entity';
import { Train } from './trains/train.entity';
import { Report } from './reports/report.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      autoLoadEntities: true,
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Train, Alert, Report, TrainRoute]),
    TrainsModule,
    AlertsModule,
    ReportsModule,
    RoutesModule,
  ],
  controllers: [AppController],
  providers: [AppService, SeedService],
})
export class AppModule { }
