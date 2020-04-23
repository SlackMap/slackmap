import { Test, TestingModule } from '@nestjs/testing';
import { AuthRegisterByFacebookUseCase } from './auth-register-by-facebook.usecase';
import { AuthRegisterByFacebookRequestDto, AuthRegisterByFacebookDto } from '../dto';

describe('AuthRegisterByFacebookUseCase', () => {
  let module: TestingModule;
  let usecase: AuthRegisterByFacebookUseCase;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      providers: [AuthRegisterByFacebookUseCase]
    })
      // .overrideProvider()
      // .useClass()
      .compile();
    usecase = module.get(AuthRegisterByFacebookUseCase);
  });

  afterAll(async () => {
    await module.close();
  });

  test('should work', () => {
    const requestDto: AuthRegisterByFacebookRequestDto = {

    };
    const responseDto: AuthRegisterByFacebookDto = {
      // object: expect.any(Object),
      // array: expect.any(Array),
      // string: expect.any(String)
    };
    return usecase
      .process(requestDto)
      .toPromise()
      .then(res => {
        expect(res).toMatchObject(responseDto);
      })
      .catch(err => {
        expect(err).toBeFalsy();
      });
  });
});
