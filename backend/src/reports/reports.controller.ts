import { Controller, Get, Post, Body } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { Report } from './report.entity';

@Controller('api/reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Get()
  async findAll(): Promise<Report[]> {
    return await this.reportsService.findAll();
  }

  @Post()
  async create(@Body() reportData: Partial<Report>): Promise<Report> {
    // NestJS automatycznie zmapuje JSON z body na obiekt Partial<Report>
    return await this.reportsService.create(reportData);
  }
}