import { Component, effect, ElementRef, inject, OnInit, signal, ViewChild } from '@angular/core';
import { RouteService } from '../../core/services/route.service';
import { TrainRoute } from '../../core/models/route.model';
import { CommonModule } from '@angular/common';
import { TrainService } from '../../core/services/train.service';


@Component({
  selector: 'app-map-view',
  imports: [CommonModule],
  templateUrl: './map-view.component.html',
  styleUrl: './map-view.component.css'
})
export class MapViewComponent implements OnInit {
  @ViewChild('mapCanvas', { static: true }) canvas!: ElementRef<HTMLCanvasElement>;

  routeService = inject(RouteService);
  trainService = inject(TrainService);
  routes = this.routeService.routes;
  hoveredRouteId = signal<number | null>(null);

  // Stan kamery
  scale = 1;
  offsetX = 0;
  offsetY = 0;
  isDragging = false;
  lastMouseX = 0;
  lastMouseY = 0;

  constructor() {
    effect(() => this.drawMap());
  }

  ngOnInit() {
    this.routeService.fetchRoutes();
  }

  // --- LOGIKA INTERAKCJI ---
  onWheel(event: WheelEvent) {
    event.preventDefault();
    const zoomSpeed = 0.1;
    const delta = event.deltaY > 0 ? -zoomSpeed : zoomSpeed;
    const newScale = Math.min(Math.max(0.4, this.scale + delta), 4);

    const rect = this.canvas.nativeElement.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    this.offsetX -= (mouseX - this.offsetX) * (newScale / this.scale - 1);
    this.offsetY -= (mouseY - this.offsetY) * (newScale / this.scale - 1);

    this.scale = newScale;
    this.drawMap();
  }

  onMouseDown(event: MouseEvent) {
    this.isDragging = true;
    this.lastMouseX = event.clientX;
    this.lastMouseY = event.clientY;
  }

  onMouseMove(event: MouseEvent) {
    if (!this.isDragging) return;
    this.offsetX += event.clientX - this.lastMouseX;
    this.offsetY += event.clientY - this.lastMouseY;
    this.lastMouseX = event.clientX;
    this.lastMouseY = event.clientY;
    this.drawMap();
  }

  onMouseUp() { this.isDragging = false; }

  resetView() {
    this.scale = 1;
    this.offsetX = 0;
    this.offsetY = 0;
    this.drawMap();
  }

  // --- RYSOWANIE ---
  drawMap() {
    const ctx = this.canvas.nativeElement.getContext('2d');
    if (!ctx) return;

    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, 650, 600);

    ctx.translate(this.offsetX, this.offsetY);
    ctx.scale(this.scale, this.scale);

    // Tło/Siatka
    this.drawGrid(ctx);

    const activeId = this.hoveredRouteId();
    this.routes().forEach(route => {
      const opacity = (activeId === null || activeId === route.id) ? 1 : 0.15;
      this.drawRoute(ctx, route, opacity);
    });
  }

  private drawGrid(ctx: CanvasRenderingContext2D) {
    ctx.strokeStyle = '#f2f2f2';
    ctx.lineWidth = 1 / this.scale;
    for (let i = -1000; i <= 2000; i += 50) {
      ctx.beginPath(); ctx.moveTo(i, -1000); ctx.lineTo(i, 2000); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(-1000, i); ctx.lineTo(2000, i); ctx.stroke();
    }
  }

  private drawRoute(ctx: CanvasRenderingContext2D, route: TrainRoute, opacity: number) {
    ctx.save();
    ctx.globalAlpha = opacity;
    ctx.beginPath();
    ctx.strokeStyle = route.lineColor;
    ctx.lineWidth = 6 / this.scale;
    ctx.lineJoin = 'round';

    route.path.forEach((s: any, i: number) => {
      if (i === 0) ctx.moveTo(s.x, s.y);
      else ctx.lineTo(s.x, s.y);
    });
    ctx.stroke();

    route.path.forEach((s: any) => {
      ctx.fillStyle = '#fff';
      ctx.strokeStyle = route.lineColor;
      ctx.lineWidth = 2 / this.scale;
      ctx.beginPath();
      ctx.arc(s.x, s.y, 5 / this.scale, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = '#333';
      ctx.font = `${12 / this.scale}px sans-serif`;
      ctx.fillText(s.stationName, s.x + (10 / this.scale), s.y + (4 / this.scale));
    });
    ctx.restore();
    if (opacity === 1) { // Rysujemy pociąg tylko dla wyróżnionej linii lub wszystkich jeśli brak hovera
      const train = this.trainService.trains().find(t => t.id === route.trainId);
      if (train) {
        const pos = this.getTrainCoords(route.path, route.currentPos);
        this.drawTrainIcon(ctx, pos.x, pos.y, train.name, route.lineColor);
      }
    }
  }

  private getTrainCoords(path: any[], progress: number): { x: number, y: number } {
    const totalSegments = path.length - 1;
    const segmentIndex = Math.min(Math.floor((progress / 100) * totalSegments), totalSegments - 1);
    const segmentProgress = ((progress / 100) * totalSegments) - segmentIndex;

    const start = path[segmentIndex];
    const end = path[segmentIndex + 1];

    return {
      x: start.x + (end.x - start.x) * segmentProgress,
      y: start.y + (end.y - start.y) * segmentProgress
    };
  }

  private drawTrainIcon(ctx: CanvasRenderingContext2D, x: number, y: number, trainName: string, color: string) {
    const size = 10 / this.scale;

    // Cień i poświata pociągu
    ctx.shadowBlur = 10 / this.scale;
    ctx.shadowColor = color;

    // Główny punkt pociągu
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x, y, size, 0, Math.PI * 2);
    ctx.fill();

    // Obwódka
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 2 / this.scale;
    ctx.stroke();

    // Etykieta pociągu
    ctx.shadowBlur = 0;
    ctx.fillStyle = '#000';
    ctx.font = `bold ${12 / this.scale}px Arial`;
    ctx.fillText(trainName, x + size + 5, y - 5);
  }

}
