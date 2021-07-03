import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { EnvService } from './env.service';

describe('EnvService', () => {
  let service: EnvService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          validate: EnvService.validate,
        }),
      ],
      providers: [EnvService],
    }).compile();

    service = module.get(EnvService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
