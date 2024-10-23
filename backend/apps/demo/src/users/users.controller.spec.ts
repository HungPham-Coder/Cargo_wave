import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { UsersService } from './users.service';
describe('UsersController', () => {
  let controller: UsersController;
  let app: INestApplication;
  const mockUsersService = {
    create: jest.fn(dto => {
      return {
        id: Date.now(),
        ...dto
      }
    })
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService]
    }).overrideProvider(UsersService)
    .useValue(mockUsersService)
    .compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should be create ', () => {
    expect (controller.create({
      name: "Phuong Dong",
      phone_number: null,
      image: null,
      email: "nnpdong.magic1306@gmail.com",
      dob:new Date("2024-09-17T05:34:11.229Z"),
      gender: 1,
      password: "nhatmagic10",
      "status": 1,
      "roles": [
        {
            "id": "e6ddc7ed-99de-45bf-b0be-d404a5a72024",
            "name": "Employee"
        }
    ]})).toEqual({
      id:expect.any(String),
      name: 'Phuong Dong'
    });
  })

  // it('/users/findAll(GET)', () => {
  //   return request(app.getHttpServer())
  //     .get('/users/findAll')
  //     .expect(200)
  //     .expect((res) => {
  //       // Kiểm tra dữ liệu trong response
  //       expect(Array.isArray(res.body)).toBeTruthy();
  //     });
  // });
});
