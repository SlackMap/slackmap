import { Test, TestingModule } from '@nestjs/testing';
import { OrientService } from './orient.service';
import { OrientConfig } from './orient.config';

describe('OrientService', () => {
  let service: OrientService;
  let module: TestingModule;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      providers: [OrientService, OrientConfig]
    }).compile();
    service = module.get<OrientService>(OrientService);
  });

  afterAll(async () => {
    await module.close();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // beforeEach(async () => {
  //   session = await orient.session();
  // });
  // afterEach(async () => {
  //   session.close();
  //   session = undefined;
  // });

  // test('get Orient instance', () => {
  //   expect(orient).toBeInstanceOf(Orient);
  // });

  // test('get session instance', () => {
  //   expect(session).toBeDefined();
  // });

  // test('SELECT FROM', async () => {
  //   const res = await session.query('SELECT FROM Log LIMIT 1').all();
  //   expect(res).toBeTruthy();
  //   expect(res.length).toBeGreaterThan(0);
  // });

  // test('INSERT INTO with CONTENT with inline json', async () => {
  //   const res = await session
  //     .command('INSERT INTO Log CONTENT {test: "inline json"}')
  //     .all();
  //   expect(res).toBeTruthy();
  // });

  // test('INSERT INTO with CONTENT with params data', async () => {
  //   const res = await session
  //     .command('INSERT INTO Log CONTENT :log', {
  //       params: {
  //         log: { test: 'json in params' }
  //       }
  //     })
  //     .all();
  //   expect(res).toBeTruthy();
  // });

  // test('INSERT with builder', async () => {
  //   const res = await session
  //     .insert()
  //     .into('Log')
  //     .set({ test: 'json in params' })
  //     .one();
  //   console.log('inserted', res);
  //   expect(res).toBeTruthy();
  // });

  // test('DELETE FROM', async () => {
  //   const res = await session
  //     .command('DELETE FROM Log WHERE test IS NOT NULL')
  //     .all();
  //   expect(res).toBeTruthy();
  // });

  it.skip('should close the connection', async () => {

    const m: TestingModule = await Test.createTestingModule({
      providers: [OrientService, OrientConfig]
    }).compile();
    const s: OrientService = module.get<OrientService>(OrientService);

    const db = await s.acquire();
    expect(db).toBeDefined();

    await m.close();
    expect(s['_pool']).toBeNull();
    expect(s['_client']).toBeNull();
  });
});
