import { IsString, IsDate, IsNumber, IsUUID } from 'class-validator';
import { Route } from '../../entities/routes.entity';
import { Type } from 'class-transformer';

export class CreateRouteDto {
  @IsString()
  name: string;

  @IsDate()
  @Type(() => Date)
  departure_time: Date;

  @IsDate()
  @Type(() => Date)
  arrival_time: Date;

  @IsNumber()
  status: number;

  @IsUUID()
  transportID: string;

  @IsUUID()
  departureID: string;

  @IsUUID()
  arrivalID: string;
}

export class ShippingTypeDTO {
  id: string;
  name: string;
}


export class RouteWithTransportDTO {
  route: Route; // Route entity
}