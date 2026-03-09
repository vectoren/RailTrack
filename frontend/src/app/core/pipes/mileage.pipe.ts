import {Pipe, PipeTransform} from '@angular/core';
@Pipe({
  name: 'mileage',
})
export class MileagePipe implements PipeTransform {
  transform(value: number | string): string {
    if (value === null || value === undefined) return '';
    const num = typeof value === 'string' ? parseFloat(value) : value;
    if (isNaN(num)) return value.toString();
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }
}