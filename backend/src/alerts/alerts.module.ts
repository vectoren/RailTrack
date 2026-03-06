import { Module } from "@nestjs/common";
import { TrainsModule } from "src/trains/trains.module";
import { AlertsController } from "./alerts.controller";
import { AlertsService } from "./alerts.service";

@Module({
  imports: [TrainsModule], 
  controllers: [AlertsController],
  providers: [AlertsService],
})
export class AlertsModule {}