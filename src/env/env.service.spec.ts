import { ConfigModule } from '@nestjs/config';
import { Test } from '@nestjs/testing';
import { EnvService } from './env.service';

describe('EnvService', () => {
  let envService: EnvService;

  beforeEach(async () => {
    const testingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          validate: EnvService.validate,
        }),
      ],
      providers: [EnvService],
    }).compile();

    envService = testingModule.get(EnvService);
  });

  it('should be defined', () => {
    expect(envService).toBeDefined();
  });
});
