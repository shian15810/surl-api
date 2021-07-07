import { Test } from '@nestjs/testing';
import { PARAMS_PROVIDER_TOKEN, PinoLogger } from 'nestjs-pino';

import { LoggerService } from './logger.service';

describe('LoggerService', () => {
  let loggerService: LoggerService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        PinoLogger,
        {
          provide: PARAMS_PROVIDER_TOKEN,
          useValue: {},
        },
        LoggerService,
      ],
    }).compile();

    loggerService = moduleRef.get(LoggerService);
  });

  it('should be defined', () => {
    expect(loggerService).toBeDefined();
  });
});
