import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Train } from '../trains/train.entity';
import { Urgency } from 'src/reports/report.entity';

@Entity('alerts')
export class Alert {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  statusMessage: string;

  @Column({ type: 'int' })
  urgency: number;

  // Relacja musi wskazywać na kolumnę trainId
  @ManyToOne(() => Train, (train) => train.alerts, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'trainId' }) // To jest kluczowe!
  train: Train;

  @Column()
  trainId: number; // Dodaj to pole jawnie, ułatwia seedowanie
}