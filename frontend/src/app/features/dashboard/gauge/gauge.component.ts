import { Component, computed, input } from '@angular/core';

@Component({
  selector: 'app-gauge',
  imports: [],
  templateUrl: './gauge.component.html',
  styleUrl: './gauge.component.css'
})
export class GaugeComponent {
  // Dane wejściowe jako sygnały
  value = input<number>(0);      // Wartość 0-100
  color = input<string>('#3498db'); // Kolor paska
  label = input<string>('');     // Podpis pod procentem

  readonly circumference = 125.6; // Obliczone dla promienia 40 (PI * R)
  readonly pathData = "M 10 50 A 40 40 0 0 1 90 50";

  // Obliczanie przesunięcia (offsetu) dla łuku
  dashOffset = computed(() => {
    const progress = this.value() / 100;
    return this.circumference * (1 - progress);
  });
}
