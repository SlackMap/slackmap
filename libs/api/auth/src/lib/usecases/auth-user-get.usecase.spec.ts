import { Test } from 'testing';
import { AuthUserGetUseCase } from './auth-user-get.usecase';
import { DataMockModule, Mock, UserSessionMockData } from 'data-mock';
import { AuthUserGetResponseDto } from '@domain/dto';

describe('auth-user-get UseCase', () => {
  let usecase: AuthUserGetUseCase, module, mock: Mock, session: UserSessionMockData;
  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [DataMockModule],
      providers: [AuthUserGetUseCase]
    }).compile();

    usecase = module.get(AuthUserGetUseCase);
    mock = module.select(DataMockModule).get(Mock);
    session = await mock.user.generateUserSession();
  });
  afterAll(async () => {
    await mock.destroy();
    module.destroy();
  });

  test('should throw jwt malformed', () => {
    return usecase
      .process({
        api_token: 'invalid token'
      })
      .then(
        (res: AuthUserGetResponseDto) => {
          expect(res).toBeFalsy();
        },
        err => {
          expect(err.name).toBe('ValidationError');
          expect(err.title).toContain('malformed');
        }
      );
  });
  test('should throw error: profile id is required', async () => {
    return usecase
      .process({
        api_token: session.api_token
      })
      .then(
        (res: AuthUserGetResponseDto) => {
          const value = {
            user: expect.any(Object),
            users: expect.any(Array),
            api_token: expect.any(String)
          };
          expect(res).toMatchObject(value);
          expect(res.users).toHaveLength(1);
        },
        err => {
          expect(err).toBeFalsy();
        }
      );
  });
});
