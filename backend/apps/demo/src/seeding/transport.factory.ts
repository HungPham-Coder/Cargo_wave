import { setSeederFactory } from "typeorm-extension";
import { faker } from '@faker-js/faker';
import { Transport } from "../entities/transport.entity";
import { ShippingTypeFactory } from "./shippingType.factory";

export const TransportFactory = setSeederFactory(Transport, () => {
    const transport= new Transport();
    transport.name = faker.vehicle.vehicle(); // Tạo tên phương tiện
    transport.license_plate = faker.vehicle.vrm(); // Biển số xe
    transport.status = Math.floor(Math.random() * 2); // Tạo trạng thái ngẫu nhiên (0 hoặc 1)
    
    // Gán một shipping type ngẫu nhiên
    // transport.shippingType = new ShippingTypeFactory(); // Tạo ShippingType giả cho Transport
    return transport;
})