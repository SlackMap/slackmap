import { Test, TestingModule } from '@nestjs/testing';
import { <%= classify(name) %>UseCase } from './auth-register-by-facebook.usecase';
import { <%= classify(name) %>RequestDto, <%= classify(name) %>Dto } from '../dto';

describe('<%= classify(name) %>UseCase', () => {
  let module: TestingModule;
  let usecase: <%= classify(name) %>UseCase;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      providers: [<%= classify(name) %>UseCase]
    })
      // .overrideProvider()
      // .useClass()
      .compile();
    usecase = module.get(<%= classify(name) %>UseCase);
  });

  afterAll(async () => {
    await module.close();
  });

  test('should work', () => {
    const requestDto: <%= classify(name) %>RequestDto = {

    };
    const responseDto: <%= classify(name) %>Dto = {
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
