import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Report } from './report.entity';

@Injectable()
export class ReportsService {
  constructor(
    @InjectRepository(Report)
    private readonly reportRepo: Repository<Report>
  ) {}

  async findAll(): Promise<Report[]> {
    return await this.reportRepo.find({
      order: { urgency: 'ASC', id: 'DESC' }
    });
  }

  async create(dto: Partial<Report>): Promise<Report> {
    const report = this.reportRepo.create(dto);
    return await this.reportRepo.save(report);
  }
}