import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Train } from '../trains/train.entity';
import { Alert } from '../alerts/alert.entity';
import { Report, Urgency } from '../reports/report.entity';
import { TrainRoute } from '../routes/route.entity';
import { MaintenanceEvent } from 'src/maintenance/maintenance-event.entity';

@Injectable()
export class SeedService implements OnModuleInit {
    private readonly logger = new Logger(SeedService.name);

    constructor(
        @InjectRepository(Train) private trainRepo: Repository<Train>,
        @InjectRepository(Alert) private alertRepo: Repository<Alert>,
        @InjectRepository(Report) private reportRepo: Repository<Report>,
        @InjectRepository(TrainRoute) private routeRepo: Repository<TrainRoute>,
        @InjectRepository(MaintenanceEvent) private maintenanceRepo: Repository<MaintenanceEvent>,
    ) { }

    async onModuleInit() {
        this.logger.log('--- GENEROWANIE PEŁNEJ FLOTY I INFRASTRUKTURY ---');

        try {
            await this.trainRepo.query('TRUNCATE TABLE alerts, routes, reports, trains RESTART IDENTITY CASCADE');

            // 1. DUŻA FLOTA (10 jednostek)
            const trainData = [
                { name: "Pendolino ED250-001", type: "Alstom EMZ", status: "active" as any, mileage: 125400 },
                { name: "Pendolino ED250-005", type: "Alstom EMZ", status: "active" as any, mileage: 98200 },
                { name: "Dart ED161-022", type: "Pesa Bydgoszcz", status: "active" as any, mileage: 89200 },
                { name: "Griffin E4MSU", type: "Newag Lokomotywa", status: "maintenance" as any, mileage: 45600 },
                { name: "Dragon 2 Cargo", type: "Newag Cargo", status: "active" as any, mileage: 156000 },
                { name: "Husarz EU44", type: "Siemens EuroSprinter", status: "active" as any, mileage: 210500 },
                { name: "Elf II Regio", type: "Pesa Regio", status: "standby" as any, mileage: 32100 },
                { name: "Impuls 45WE", type: "Newag Koleje Dolnośląskie", status: "active" as any, mileage: 112000 },
                { name: "Vectron MS", type: "Siemens Mobility", status: "out_of_service" as any, mileage: 12400 },
                { name: "Traxx DC3", type: "Bombardier/Alstom", status: "active" as any, mileage: 74300 }
            ];

            const savedTrains = await this.trainRepo.save(trainData);

            // 2. DUŻO ALERTÓW POJAZDOWYCH (Systemowych)
            await this.alertRepo.save([
                { train: savedTrains[0], statusMessage: "Wysoka temperatura łożyska (oś 3) - wymagana kontrola.", urgency: Urgency.IMMEDIATE },
                { train: savedTrains[3], statusMessage: "Spadek ciśnienia w układzie hamulcowym (człon B).", urgency: Urgency.HIGH },
                { train: savedTrains[8], statusMessage: "Krytyczny błąd falownika głównego - jednostka unieruchomiona.", urgency: Urgency.IMMEDIATE },
                { train: savedTrains[2], statusMessage: "Błąd komunikacji ETCS poziomu 2 - wymagany restart.", urgency: Urgency.HIGH },
                { train: savedTrains[4], statusMessage: "Niskie ciśnienie oleju w sprężarce pomocniczej.", urgency: Urgency.MODERATE },
                { train: savedTrains[7], statusMessage: "Zużycie nakładek pantografu > 85%. Zaplanuj wymianę.", urgency: Urgency.MODERATE },
                { train: savedTrains[5], statusMessage: "Nieszczelność w przewodzie głównym hamulca zespolonego.", urgency: Urgency.HIGH }
            ]);

            // 3. DUŻO ZGŁOSZEŃ INFRASTRUKTURALNYCH (Torowisko i Sieć)
            await this.reportRepo.save([
                { reporterId: 101, content: "LK9 km 114.2: Pęknięta szyna (tok prawy). Ograniczenie do 10km/h.", urgency: Urgency.IMMEDIATE },
                { reporterId: 204, content: "Stacja Łódź Fabryczna: Awaria napędu rozjazdu nr 12.", urgency: Urgency.HIGH },
                { reporterId: 305, content: "Szlak CMK km 22.1: Możliwość zerwania sieci - luźny wieszak.", urgency: Urgency.IMMEDIATE },
                { reporterId: 112, content: "Przejazd kat. B (km 44.1): Uszkodzona rogatka przez pojazd drogowy.", urgency: Urgency.IMMEDIATE },
                { reporterId: 99, content: "LK131: Osuwisko tłucznia na nasypie przy rzece.", urgency: Urgency.HIGH },
                { reporterId: 54, content: "Semafor wjazdowy S2 (Warszawa Włochy): Przepalona komora światła białego.", urgency: Urgency.MODERATE },
                { reporterId: 77, content: "Wykryto kradzież dławika torowego na odcinku zurbanizowanym.", urgency: Urgency.HIGH }
            ]);

            // 4. WIĘCEJ TRAS (Cała mapa Polski)
            await this.routeRepo.save([
                {
                    trainId: savedTrains[0].id,
                    lineName: "E20: Magistrala Zachodnia", lineColor: "#2ecc71", currentPos: 65,
                    path: [{ x: 850, y: 400, stationName: "Warszawa" }, { x: 700, y: 380, stationName: "Łowicz" }, { x: 400, y: 410, stationName: "Poznań" }]
                },
                {
                    trainId: savedTrains[5].id,
                    lineName: "E30: Magistrala Południowa", lineColor: "#3498db", currentPos: 30,
                    path: [{ x: 700, y: 750, stationName: "Kraków" }, { x: 550, y: 730, stationName: "Katowice" }, { x: 250, y: 680, stationName: "Wrocław" }]
                },
                {
                    trainId: savedTrains[2].id,
                    lineName: "LK9: Trasa Północna", lineColor: "#9b59b6", currentPos: 15,
                    path: [{ x: 450, y: 50, stationName: "Gdańsk" }, { x: 650, y: 250, stationName: "Iława" }, { x: 850, y: 400, stationName: "Warszawa" }]
                },
                {
                    trainId: savedTrains[4].id,
                    lineName: "LK131: Magistrala Węglowa", lineColor: "#e67e22", currentPos: 50,
                    path: [{ x: 550, y: 730, stationName: "Katowice" }, { x: 520, y: 450, stationName: "Zduńska Wola" }, { x: 480, y: 100, stationName: "Bydgoszcz" }]
                }
            ]);

            await this.maintenanceRepo.save([
                {
                    trainId: savedTrains[0].id,
                    date: '2026-01-15',
                    description: 'Przegląd okresowy poziomu P3',
                    technician: 'Jan Kowalski',
                    cost: 12500
                },
                {
                    trainId: savedTrains[0].id,
                    date: '2026-02-10',
                    description: 'Wymiana klocków hamulcowych (komplet)',
                    technician: 'Andrzej Nowak',
                    cost: 4200
                },
                {
                    trainId: savedTrains[3].id,
                    date: '2025-12-01',
                    description: 'Naprawa układu klimatyzacji',
                    technician: 'Marek Wiśniewski',
                    cost: 1800
                }
            ]);
            this.logger.log('--- SEEDOWANIE ZAKOŃCZONE: Baza jest pełna! ---');
        } catch (error) {
            this.logger.error(`Błąd: ${error.message}`);
        }
    }
}