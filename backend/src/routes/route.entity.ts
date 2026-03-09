import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

export interface CanvasPoint {
  x: number;
  y: number;
  stationName: string;
}

@Entity('routes')
export class TrainRoute {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  trainId: number;

  @Column()
  lineName: string;

  @Column()
  lineColor: string;

  // Typ jsonb pozwala przechowywać tablicę obiektów CanvasPoint
  @Column({ type: 'jsonb' })
  path: CanvasPoint[];

  @Column({ type: 'float', default: 0 })
  currentPos: number;
}