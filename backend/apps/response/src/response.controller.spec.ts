import { Test, TestingModule } from '@nestjs/testing';
import { ResponseController } from './response.controller';
import { ResponseService } from './response.service';

describe('ResponseController', () => {
  let responseController: ResponseController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ResponseController],
      providers: [ResponseService],
    }).compile();

    responseController = app.get<ResponseController>(ResponseController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(responseController.getHello()).toBe('Hello World!');
    });
  });
});
