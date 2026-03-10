import { Alert } from "src/alerts/alert.entity";
import { MaintenanceEvent } from "src/maintenance/maintenance-event.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";



@Entity("trains")
export class Train {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;      // e.g., "Pendolino ED250"
  @Column()
  type: string;     // e.g., "Alstom"
  @Column({ default: 'standby' })
  status: 'active' | 'standby' | 'maintenance' | 'out_of_service';
  @Column({ type: "int", default: 0 })
  mileage: number;  // in kilometers
  @OneToMany(() => Alert, (alert) => alert.train)
  alerts: Alert[];
  @OneToMany(() => MaintenanceEvent, (event) => event.train)
  serviceHistory: MaintenanceEvent[];
}