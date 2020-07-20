import { Test, TestingModule } from '@nestjs/testing';
import { ThemeSerialiserService } from './theme-serialiser.service';

describe('ThemeSerialiserService', () => {
  let service: ThemeSerialiserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ThemeSerialiserService],
    }).compile();

    service = module.get<ThemeSerialiserService>(ThemeSerialiserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
