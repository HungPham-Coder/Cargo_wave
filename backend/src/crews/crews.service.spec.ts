import { Test, TestingModule } from '@nestjs/testing';
import { CrewsService } from './crews.service';

describe('CrewsService', () => {
  let service: CrewsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CrewsService],
    }).compile();

    service = module.get<CrewsService>(CrewsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
