import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Train } from '../trains/train.entity';

@Entity('maintenance_events')
export class MaintenanceEvent {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'date' })
  date: string;

  @Column()
  description: string;

  @Column()
  technician: string;

  @Column({ default: 'Completed' })
  status: string;

  @Column({ type: 'decimal', nullable: true })
  cost: number;

  @ManyToOne(() => Train, (train) => train.serviceHistory, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'trainId' })
  train: Train;

  @Column()
  trainId: number;
}