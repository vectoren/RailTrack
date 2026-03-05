import { IsString, IsNotEmpty, IsEnum, IsNumber, IsDateString } from 'class-validator';
export class Train {
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @IsString()
  @IsNotEmpty()
  name: string;      // e.g., "Pendolino ED250"

  @IsString()
  @IsNotEmpty()
  type: string;     // e.g., "Alstom"

  @IsEnum(['active', 'maintenance', 'out_of_service'])
  status: 'active' | 'maintenance' | 'out_of_service';

  @IsNumber()
  mileage: number;   // in kilometers
}