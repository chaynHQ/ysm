import { Test, TestingModule } from '@nestjs/testing';
import { PageSerialiserService } from './page-serialiser.service';

describe('PageSerialiserService', () => {
  let service: PageSerialiserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PageSerialiserService],
    }).compile();

    service = module.get<PageSerialiserService>(PageSerialiserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
