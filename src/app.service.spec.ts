import { Test } from '@nestjs/testing';
import { AppService } from './app.service';

describe('AppService', () => {
  let appService: AppService;

  beforeEach(async () => {
    const testingModule = await Test.createTestingModule({
      providers: [AppService],
    }).compile();

    appService = testingModule.get(AppService);
  });

  it('should be defined', () => {
    expect(appService).toBeDefined();
  });
});
