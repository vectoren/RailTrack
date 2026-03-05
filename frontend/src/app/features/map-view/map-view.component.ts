import { Component, ElementRef, inject, OnInit, signal, ViewChild } from '@angular/core';
import { RouteService } from '../../core/services/route.service';
import { TrainRoute } from '../../core/models/route.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-map-view',
  imports: [CommonModule],
  templateUrl: './map-view.component.html',
  styleUrl: './map-view.component.css'
})
export class MapViewComponent implements OnInit{
  @ViewChild('mapCanvas') set canvasRef(ref: ElementRef<HTMLCanvasElement>) {
    if (ref) this.drawMap(ref.nativeElement);
  }

  routeService = inject(RouteService);
  activeRoute = signal<TrainRoute | null>(null);

  ngOnInit() {
    this.routeService.fetchRoutes();
  }

  openMap(route: TrainRoute) {
    this.activeRoute.set(route);
  }

  closeMap() {
    this.activeRoute.set(null);
  }

  drawMap(canvas: HTMLCanvasElement) {
    const ctx = canvas.getContext('2d');
    const route = this.activeRoute();
    if (!ctx || !route) return;

    // Czyścimy tło
    ctx.fillStyle = '#f8f8f8';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Rysujemy linię metra
    ctx.strokeStyle = route.lineColor;
    ctx.lineWidth = 10;
    ctx.lineJoin = 'round';
    ctx.beginPath();
    
    route.path.forEach((p, i) => {
      if (i === 0) ctx.moveTo(p.x, p.y);
      else ctx.lineTo(p.x, p.y);
    });
    ctx.stroke();

    // Rysujemy stacje
    route.path.forEach(p => {
      ctx.fillStyle = '#000';
      ctx.beginPath();
      ctx.arc(p.x, p.y, 6, 0, Math.PI * 2);
      ctx.fill();
    });
  }
}
