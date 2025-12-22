import { Test, TestingModule } from '@nestjs/testing';
import { GenreModuleController } from '../genres.controller';
import { GenreModuleService } from './genre-module.service';

describe('GenreModuleController', () => {
  let controller: GenreModuleController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GenreModuleController],
      providers: [GenreModuleService],
    }).compile();

    controller = module.get<GenreModuleController>(GenreModuleController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
