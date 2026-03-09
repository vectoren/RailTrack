import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { ReportsService } from './reports.service';

@Controller('api/reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Get()
  getAllReports() {
    return this.reportsService.findAll();
  }

  @Get(':id')
  getReportByID(@Param('id', ParseIntPipe) id: number) {
    return this.reportsService.findByID(id);
  }
}