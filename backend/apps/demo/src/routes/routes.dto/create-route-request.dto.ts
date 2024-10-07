import { IsString, IsDate, IsNumber, IsUUID } from 'class-validator';
import { Route } from '../../entities/routes.entity';

export class CreateRouteDto {
  @IsString()
  name: string;

  @IsDate()
  departure_time: Date;

  @IsDate()
  arrival_time: Date;

  @IsNumber()
  distance: number;

  @IsNumber()
  status: number;

  @IsNumber()
  flag: number;

  @IsUUID()
  userID: string;

  @IsUUID()
  shipID: string;

  @IsUUID()
  locationID: string;
}

export class ShippingTypeDTO {
  id: string;
  name: string;
}

export class TransportDTO {
  id: string;
  name: string;
  license_plate: string;
  status: number;
  shippingType: ShippingTypeDTO; // Relation to ShippingType
}

export class LocationDTO {
  id: string;
  name: string;
  address: string;
  longitude: number; 
  latitude: number;
}

export class RouteWithTransportDTO {
  route: Route; // Route entity
}