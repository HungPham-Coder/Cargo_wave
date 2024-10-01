import { Test, TestingModule } from '@nestjs/testing';
import { CrewsController } from './crews.controller';

describe('CrewsController', () => {
  let controller: CrewsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CrewsController],
    }).compile();

    controller = module.get<CrewsController>(CrewsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
