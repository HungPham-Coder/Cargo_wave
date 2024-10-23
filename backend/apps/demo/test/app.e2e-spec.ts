import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  

  // it('/users/findById/:id (GET)', () => {
  //   return request(app.getHttpServer())
  //     .get('/users/findById/ba0bf44b-9c05-4644-b3c9-34f542594d0b')
  //     .expect(200)
  //     .expect((res) => {
  //       // Kiểm tra thông tin người dùng
  //       expect(res.body).toHaveProperty('id', 1);
  //       expect(res.body).toHaveProperty('name');
  //     });
  // });

  // it('/users/:id (DELETE)', () => {
  //   return request(app.getHttpServer())
  //     .delete('/users/1')
  //     .expect(204); // Mong đợi không có nội dung
  // });
});
