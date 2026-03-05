export interface Train {
  
  id: number;

  name: string;      // e.g., "Pendolino ED250"

  type: string;     // e.g., "Alstom"

  status: 'active' | 'maintenance' | 'out_of_service';

  mileage: number;   // in kilometers
}