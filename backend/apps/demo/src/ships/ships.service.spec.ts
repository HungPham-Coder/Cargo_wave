import { Test, TestingModule } from '@nestjs/testing';
import { ShipsService } from './ships.service';

describe('ShipsService', () => {
  let service: ShipsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ShipsService],
    }).compile();

    service = module.get<ShipsService>(ShipsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
