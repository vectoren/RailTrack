import { Injectable } from '@nestjs/common';
import { TrainRoute } from './route.entity';

@Injectable()
export class RoutesService {
  private routes: TrainRoute[] = [
    { id: 1, trainId: 101, lineName: "Linia Północ-Południe", lineColor: "#e74c3c", currentPos: 25, path: [{ x: 450, y: 50, stationName: "Warszawa Tarchomin" }, { x: 450, y: 150, stationName: "Warszawa Centrum" }, { x: 450, y: 350, stationName: "Warszawa Mokotów" }, { x: 550, y: 550, stationName: "Piaseczno" }] },
  { id: 2, trainId: 102, lineName: "Magistrala Wschód", lineColor: "#2ecc71", currentPos: 60, path: [{ x: 50, y: 150, stationName: "Poznań Główny" }, { x: 250, y: 150, stationName: "Konin" }, { x: 450, y: 150, stationName: "Warszawa Centrum" }, { x: 750, y: 150, stationName: "Siedlce" }] },
  { id: 3, trainId: 103, lineName: "Linia Podmiejska Zachód", lineColor: "#f1c40f", currentPos: 10, path: [{ x: 50, y: 500, stationName: "Grodzisk Maz." }, { x: 200, y: 350, stationName: "Pruszków" }, { x: 450, y: 350, stationName: "Warszawa Mokotów" }, { x: 800, y: 350, stationName: "Otwock" }] },
  { id: 4, trainId: 104, lineName: "Szybka Kolej Obwodowa", lineColor: "#9b59b6", currentPos: 85, path: [{ x: 100, y: 100, stationName: "Lotnisko Chopina" }, { x: 250, y: 150, stationName: "Konin" }, { x: 200, y: 350, stationName: "Pruszków" }, { x: 100, y: 500, stationName: "Grodzisk Maz." }] },
  { id: 5, trainId: 105, lineName: "Express Regionalny", lineColor: "#34495e", currentPos: 40, path: [{ x: 750, y: 50, stationName: "Białystok" }, { x: 600, y: 250, stationName: "Wołomin" }, { x: 450, y: 350, stationName: "Warszawa Mokotów" }, { x: 300, y: 550, stationName: "Radom" }] }
  ];

  findAll() { return this.routes; }

  findByTrainId(trainId: number) {
    return this.routes.find(r => r.trainId === trainId);
  }
}