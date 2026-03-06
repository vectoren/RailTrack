export interface CanvasPoint {
  x: number;
  y: number;
  stationName: string; // Opcjonalna nazwa przystanku
}

export interface TrainRoute {
  id: number;
  trainId: number;
  lineName: string;    // np. "Linia Średnicowa"
  lineColor: string;   // np. "#3498db"
  path: CanvasPoint[]; // Punkty załamania linii
  currentPos: number;  // Procent postępu pociągu (0-100)
}