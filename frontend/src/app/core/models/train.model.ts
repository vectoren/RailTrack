export interface MaintenanceEvent {
  id: number;
  date: string;
  description: string;
  technician: string;
  status: string;
  cost: number;
  trainId: number;
}

export interface Train {
  id: number;
  name: string;      // e.g., "Pendolino ED250"
  type: string;      // e.g., "Alstom"
  status: 'active' | 'standby' | 'maintenance' | 'out_of_service';
  mileage: number;   // in kilometers
  
  // Dodajemy opcjonalną tablicę z historią
  serviceHistory?: MaintenanceEvent[]; 
}