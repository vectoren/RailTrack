# 🚂 RailTrack Pro: System Zarządzania Taborem Kolejowym

**RailTrack Pro** to nowoczesna aplikacja typu Full-Stack służąca do monitorowania floty pociągów, ich stanu technicznego oraz przebiegu. Projekt wykorzystuje najnowsze standardy webowe, konteneryzację oraz architekturę mikro usługową.



---

## Struktura Projektu

Projekt jest zorganizowany w formie monorepozytorium, gdzie frontend i backend są odizolowane, ale zarządzane wspólnie przez Docker Compose.

```text
railtrack-pro/
├── frontend/             # Angular 21 Application
│   ├── src/
│   │   ├── app/
│   │   │   ├── core/     # Services, Guards, Interceptors (Signals logic)
│   │   │   ├── features/ # Train-list, Dashboard, Map-view
│   │   │   └── shared/   # Reusable UI components
│   └── Dockerfile
├── backend/              # NestJS / Node.js API
│   ├── src/
│   │   ├── trains/       # Module, Controller, Service
│   │   └── database/     # TypeORM entities (unavailable) 
│   └── Dockerfile
├── docker-compose.yml    # Orchestration of all services
├── .env                  # Environment variables (DB_URL, API_KEY)
└── README.md             # Documentation
```

## Uruchamianie projektu

#### Wymagania
Docker Desktop
Node.js v22 (opcjonalnie do pracy poza kontenerem)

#### Instalacja i Start

Sklonuj [RailTrack](https://github.com/vectoren/RailTrack.git)
```
git clone <repository-link>
cd RailTrack
docker-compose up --build
```
Po uruchomieniu aplikacja będzie dostępna pod adresem

[Strona](http://localhost:4200)

[Api](http://localhost:3000/api/trains)

