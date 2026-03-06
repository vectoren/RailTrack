import { IsString, IsNotEmpty, IsEnum, IsNumber } from 'class-validator';
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

  @IsEnum(['active', 'standby', 'maintenance', 'out_of_service'])
  status: 'active' | 'standby' | 'maintenance' | 'out_of_service';

  @IsNumber()
  mileage: number;   // in kilometers
}