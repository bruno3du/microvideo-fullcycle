import { Test, TestingModule } from '@nestjs/testing';
import { GenreModuleService } from './genre-module.service';

describe('GenreModuleService', () => {
  let service: GenreModuleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GenreModuleService],
    }).compile();

    service = module.get<GenreModuleService>(GenreModuleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
