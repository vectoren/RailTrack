import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

export enum Urgency {
    IMMEDIATE,
    HIGH,
    MODERATE,
    LOW
}

@Entity('reports')
export class Report {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    reporterId: number;

    @Column('text')
    content: string;

    @Column({
        type: 'enum',
        enum: Urgency,
        default: Urgency.LOW
    })
    urgency: Urgency;
}