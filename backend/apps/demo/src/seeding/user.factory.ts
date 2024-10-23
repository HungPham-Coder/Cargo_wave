import { setSeederFactory } from "typeorm-extension";
import { User } from "../entities/user.entity";
import { faker } from '@faker-js/faker';

export const UserFactory = setSeederFactory(User, () => {
    const user = new User();
    user.name = faker.person.fullName();
    user.email = faker.internet.email();
    user.gender = faker.person.gender() === 'female' ? 0 : 1;
    user.dob = faker.date.between({from: new Date(1980, 0, 1), to: new Date(2000, 0, 1)});
    user.password = faker.internet.password({length: 12, memorable: true});
    return user;
})