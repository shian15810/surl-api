import { Test } from '@nestjs/testing';
import { LoggerService } from './logger.service';

describe('LoggerService', () => {
  let loggerService: LoggerService;

  beforeEach(async () => {
    const testingModule = await Test.createTestingModule({
      providers: [LoggerService],
    }).compile();

    loggerService = testingModule.get(LoggerService);
  });

  it('should be defined', () => {
    expect(loggerService).toBeDefined();
  });
});
