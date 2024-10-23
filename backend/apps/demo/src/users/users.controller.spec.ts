import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';
describe('UsersController', () => {
  let controller: UsersController;
  let app: INestApplication;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('/users/findAll(GET)', () => {
    return request(app.getHttpServer())
      .get('/users/findAll')
      .expect(200)
      .expect((res) => {
        // Kiểm tra dữ liệu trong response
        expect(Array.isArray(res.body)).toBeTruthy();
      });
  });
});
