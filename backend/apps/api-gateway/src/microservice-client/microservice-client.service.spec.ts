import { Test, TestingModule } from '@nestjs/testing';
import { MicroserviceClientService } from './microservice-client.service';

describe('MicroserviceClientService', () => {
  let service: MicroserviceClientService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MicroserviceClientService],
    }).compile();

    service = module.get<MicroserviceClientService>(MicroserviceClientService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
