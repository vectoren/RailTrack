import { Urgency } from "./report.model";

export interface Alert {
  id: number;
  trainId: number;
  statusMessage: string;
  urgency: Urgency;
  trainName?: string; // Opcjonalne pole, które wypełnimy w serwisie
}