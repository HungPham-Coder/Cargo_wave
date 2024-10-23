import { setSeederFactory } from "typeorm-extension";
import { User } from "../entities/user.entity";
import { faker } from '@faker-js/faker';
import { Location } from "../entities/location.entity";

export const LocationFactory = setSeederFactory(Location, () => {
    const location= new Location();
    location.name = faker.location.city();
    location.address = faker.location.streetAddress();
    location.latitude = faker.location.latitude();
    location.longitude = faker.location.latitude();
    return location;
})