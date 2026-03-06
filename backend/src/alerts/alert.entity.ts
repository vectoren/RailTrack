export interface Alert {
  id: number;
  trainId: number;
  statusMessage: string;
  status: 'high' | 'medium' | 'low' | 'success';
  trainName?: string; // Opcjonalne pole, które wypełnimy w serwisie
}