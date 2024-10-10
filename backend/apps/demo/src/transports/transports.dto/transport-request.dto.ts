import { ShippingTypeDTO } from "../../routes/routes.dto/create-route-request.dto";

export class TransportDTO {
    id: string;
    name: string;
    license_plate: string;
    status: number;
    shippingType: ShippingTypeDTO; // Relation to ShippingType
}

export class TransportWithShippingDTO {
    shippingType: ShippingTypeDTO; // Route entity
  }