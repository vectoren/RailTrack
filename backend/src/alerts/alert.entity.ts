import { Urgency } from "src/reports/report.entity";

export interface Alert {
  id: number;
  trainId: number;
  statusMessage: string;
  urgency: Urgency;
  trainName?: string; // Opcjonalne pole, które wypełnimy w serwisie
}