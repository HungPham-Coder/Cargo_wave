import { setSeederFactory } from "typeorm-extension";
import { User } from "../entities/user.entity";
import { faker } from '@faker-js/faker';
import { Location } from "../entities/location.entity";
import { ShippingType } from "../entities/shippingType.entity";
import { getRandomValues } from "crypto";
import { TransportFactory } from "./transport.factory";

export const ShippingTypeFactory = setSeederFactory(ShippingType, () => {
    const shippingType= new ShippingType();
    shippingType.name = faker.commerce.department(); // Tạo tên loại giao hàng
    shippingType.status = Math.floor(Math.random() * 2).toString();// Tạo trạng thái ngẫu nhiên

    // Tạo một số Transport giả và gán vào thuộc tính transports
    // shippingType.transports = Array.from({ length: 3 }, () =>  new TransportFactory()); // Tạo 3 transport
    return shippingType;
})