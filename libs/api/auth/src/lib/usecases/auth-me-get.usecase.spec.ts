import { AuthMeGetUseCase } from './auth-me-get.usecase';
import { Test, TestingModule } from '@nestjs/testing';
import { ApiAuthModule } from '../api-auth.module';
import { RunWithDrivine } from '@liberation-data/drivine/utils/TestUtils';

RunWithDrivine({
  transaction: {rollback: true}
});

describe('auth-user-get UseCase', () => {
  let usecase: AuthMeGetUseCase, module: TestingModule;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [ApiAuthModule]
    }).compile();

    usecase = module.get(AuthMeGetUseCase);
  });
  afterAll(async () => {
    await module.close();
  });

  test('should return the payload (just for now)', () => {
    const payload = {user: 'fake data'};
    return usecase
      .process(payload as any)
      .then(
        (res) => {
          expect(res.user).toBe(payload.user);
        },
        err => {
          expect(err).toBeFalsy();
        }
      );
  });
});
