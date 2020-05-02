import { Test, TestingModule } from '@nestjs/testing';
import { OrientService } from './orient.service';
import { OrientConfig } from './orient.config';
import { ODatabaseSession, LiveQueryOperation } from 'orientjs';
import { tap, take } from 'rxjs/operators';
import { Logger } from '@nestjs/common';
const databaseSession = require('orientjs/lib/client/database/database');

interface LogTestEntity {
  test: string,
  '@class'?: 'Log'
}
interface DeleteResponse {
  count: number
}

describe('OrientService', () => {
  let orientService: OrientService;
  let module: TestingModule;
  let session: ODatabaseSession;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      providers: [OrientService, OrientConfig],
    }).compile();
    orientService = module.get<OrientService>(OrientService);
    session = await orientService.acquire()
  });
  afterAll(async () => {
    await module.close();
  });

  describe('Connection', () => {
    it('should be OrientService instance', () => {
      expect(orientService).toBeInstanceOf(OrientService);
    });

    it('OrientService.session() should return ODatabaseSession instance', () => {
      expect(session).toBeInstanceOf(databaseSession);
    });

    test('OrientService.acquire$ should return ODatabaseSession instance', () => {
      return orientService.acquire$().pipe(
        tap(sess => {
          expect(sess).toBeDefined();
          expect(sess).toBeInstanceOf(databaseSession);
        }),
        take(1)
      ).toPromise();
    });

    it('should close the connection', async () => {

      const spy = jest.spyOn(Logger.prototype, 'log');

      const testingModule: TestingModule = await Test.createTestingModule({
        providers: [OrientService, OrientConfig],
      }).compile();
      const service: OrientService = testingModule.get<OrientService>(OrientService);

      const db = await service.client();
      expect(db).toBeDefined();

      const spy2 = jest.spyOn(db, 'close');

      await testingModule.close();

      expect(spy).toHaveBeenCalledWith('Application Shutdown...');
      expect(spy).toHaveBeenCalledWith('Closing connection...');
      expect(spy2).toBeCalledTimes(1);
      spy.mockRestore();
      spy2.mockRestore();
    });
  });
  describe('QueryBuilder on SessionQuery', () => {

    test('SELECT by .observable()', async () => {
      const count = jest.fn();
      session.delete()
      await session.select()
        .from('Log')
        .limit(2)
        .observable()
        .pipe(
          tap(res => {
            expect(typeof res['@version']).toBe('number')
            count()
          })
        ).toPromise()

      expect(count).toHaveBeenCalledTimes(2);

    });
    test('SELECT by .one$()', async () => {
      const count = jest.fn();
      await session.select()
        .from('Log')
        .limit(2)
        .one$()
        .pipe(
          tap(res => {
            expect(typeof res['@version']).toBe('number')
            count()
          })
        ).toPromise()

      expect(count).toHaveBeenCalledTimes(1);

    });
    test('SELECT by .all$()', async () => {
      const count = jest.fn();
      await session.select()
        .from('Log')
        .limit(2)
        .all$()
        .pipe(
          tap(res => {
            expect(typeof res[0]['@version']).toBe('number')
            expect(typeof res[1]['@version']).toBe('number')
            count()
          })
        ).toPromise()

      expect(count).toHaveBeenCalledTimes(1);

    });
    test('INSERT by .observable()', async () => {
      const test = 'test log with QueryBuilder'
      await session.insert()
        .into('Log')
        .set({ test })
        .observable()
        .pipe(
          tap(res => {
            expect(typeof res['@version']).toBe('number')
          })
        ).toPromise()
    });
    test('INSERT by .one()', async () => {
      const test = 'test log with QueryBuilder'
      await session
        .insert()
        .into('Log')
        .set({ test })
        .one()
        .then(res => {
          expect(typeof res['@version']).toBe('number')
        })
    });
  });

  describe('SELECT', () => {
    let ses;
    const testStr = 'test log'
    beforeAll(async () => {
      ses = await orientService.acquire();
      await ses
        .insert()
        .into('Log')
        .set({ test: testStr })
        .one();
      await ses
        .insert()
        .into('Log')
        .set({ test: testStr })
        .one();
      await ses
        .insert()
        .into('Log')
        .set({ test: testStr })
        .one();
    })
    afterAll(async () => {
      await ses
        .delete()
        .from('Log')
        .where({ test: testStr })
        .limit(3)
        .one();
      await ses.close()
    })

    test('SELECT FROM (by OrientService.query$(sql, options))', async () => {
      const count = jest.fn();
      await orientService.query$('SELECT FROM Log LIMIT 2').pipe(
        tap(res => {
          expect(res).toBeTruthy();
          count()
        }),
      ).toPromise();

      expect(count).toHaveBeenCalledTimes(2);

    });

    test('SELECT FROM (by Observable)', async () => {
      const count = jest.fn();
      await session.query$('SELECT FROM Log LIMIT 2').pipe(
        tap(res => {
          expect(res).toBeTruthy();
          count()
        }),
      ).toPromise();

      expect(count).toHaveBeenCalledTimes(2);

    });

    test('SELECT FROM (by Promise)', async () => {
      const res = await session.query<LogTestEntity>('SELECT FROM Log LIMIT 3').all();
      expect(res).toBeDefined();
      expect(res.length).toBe(3);
    });
  });
  describe('INSERT', () => {
    test('INSERT INTO with CONTENT with inline json (by Observable)', async () => {
      const test = 'inline json';
      const count = jest.fn();
      await session.command$<LogTestEntity>(`INSERT INTO Log CONTENT {test: "${test}"}`).pipe(
        tap(res => {
          expect(res).toBeTruthy();
          expect(res.test).toBe(test);
          count()
        }),
      ).toPromise();
      expect(count).toHaveBeenCalledTimes(1);
    });

    test('INSERT INTO with CONTENT with inline json (by Promise)', async () => {
      const test = 'inline json';
      const res = await session
        .command<LogTestEntity>(`INSERT INTO Log CONTENT {test: "${test}"}`)
        .one();
      expect(res).toBeTruthy();
      expect(res.test).toBe(test);
    });

    test('INSERT INTO with CONTENT with params data (by Promise)', async () => {
      const test = 'json in params';
      const res = await session
        .command<LogTestEntity>('INSERT INTO Log CONTENT :log', {
          params: {
            log: { test }
          }
        })
        .one();
      expect(res).toBeTruthy();
      expect(res.test).toBe(test);
    });

    test('INSERT with builder', async () => {
      const res = await session
        .insert()
        .into('Log')
        .set({ test: 'json in params' })
        .one();
      expect(res).toBeTruthy();
    });
  });

  describe('DELETE', () => {
    test('DELETE FROM (by Promise)', async () => {
      const res = await session
        .command<DeleteResponse>('DELETE FROM Log WHERE test IS NOT NULL')
        .one();
      expect(res).toBeTruthy();
      expect(typeof res.count).toBe('number');
    });

    test('DELETE FROM (by Observable from single session)', async () => {
      const res = await session
        .command$<DeleteResponse>('DELETE FROM Log WHERE test IS NOT NULL')
        .toPromise();
      expect(res).toBeTruthy();
      expect(typeof res.count).toBe('number');
    });

    test('DELETE FROM (by OrientService.command$(sql, options))', async () => {
      const res = await orientService
        .command$<DeleteResponse>('DELETE FROM Log WHERE test IS NOT NULL')
        .toPromise();
      expect(res).toBeTruthy();
      expect(typeof res.count).toBe('number');
    });
  });

  describe('LiveQuery', () => {
    test('session.liveQuery$(sql, options) should get INSERT events)', async () => {
      const test = 'LiveQuery INSERT test';
      const live = new Promise((resolve, reject) => {
        const sub = session
          .liveQuery$<LogTestEntity>(`SELECT FROM Log where test = "${test}"`).subscribe(res => {
            expect(res).toBeTruthy();
            expect(res.operation).toBe(LiveQueryOperation.INSERT);
            expect(res.data.test).toBe(test);
            sub.unsubscribe();
            resolve();
          }, reject, reject);
      });

      await session
        .insert()
        .into('Log')
        .set({ test })
        .one();
      await live;

    });

    test('session.liveQuery$(sql, options) should get UPDATE events)', async () => {
      const test = 'LiveQuery UPDATE test';
      const testUpdate = 'LiveQuery UPDATE test AFTER';

      await session
        .insert()
        .into('Log')
        .set({ test })
        .one();

      const live = new Promise((resolve, reject) => {
        const sub = session
          .liveQuery$<LogTestEntity>(`SELECT FROM Log where test = "${testUpdate}"`).subscribe(res => {
            expect(res).toBeTruthy();
            expect(res.operation).toBe(LiveQueryOperation.UPDATE);
            expect(res.data.test).toBe(testUpdate);
            sub.unsubscribe();
            resolve();
          }, reject, reject);
      });

      await session
        .update('Log')
        .set({ test: testUpdate })
        .where({
          test
        })
        .one();

      await live;

    });

    test('session.liveQuery$(sql, options) should get DELETE events)', async () => {
      const test = 'LiveQuery DELETE test';

      await session
        .insert()
        .into('Log')
        .set({ test })
        .one();

      const live = new Promise((resolve, reject) => {
        const sub = session
          .liveQuery$<LogTestEntity>(`SELECT FROM Log where test = "${test}"`).subscribe(res => {
            expect(res).toBeTruthy();
            expect(res.operation).toBe(LiveQueryOperation.DELETE);
            expect(res.data.test).toBe(test);
            sub.unsubscribe();
            resolve();
          }, reject, reject);
      });

      await session
        .delete()
        .from('Log')
        .where({ test })
        .limit(1)
        .one();

      await live;

    });

    // FIX we have Error: Maximum call stack size exceeded
    // but if you run this test as only (test.only()) it is working
    // TODO do tests for live queries if there is lots of updates in one moment
    // test.skip('OrientService.liveQuery$(sql, options) should get INSERT events)', async () => {
    //   const test = 'LiveQuery OrientService INSERT test';

    //   // we need to create new session, so the liveQuery will have time to establish it's session connection
    //   // const sessionPromise = orientService.acquire();
    //   // const spy = jest.spyOn(orientService, 'acquire$').mockReturnValue(acquire(sessionPromise))

    //   const live = new Promise((resolve, reject) => {
    //     const sub = orientService
    //       .liveQuery$<LogTestEntity>(`SELECT FROM Log where test = "${test}"`).subscribe(res => {
    //         expect(res).toBeTruthy();
    //         expect(res.operation).toBe(LiveQueryOperation.INSERT);
    //         expect(res.data.test).toBe(test);
    //         sub.unsubscribe();
    //         resolve();
    //       }, reject, () => reject('complete'));
    //   });

    //   const ses2 = await orientService.acquire();
    //   const ses = await orientService.acquire();
    //   await ses2.close()
    //   await ses
    //     .insert()
    //     .into('Log')
    //     .set({ test })
    //     .one();
    //   await live;
    //   // session closing is done by acquire() operator after liveQuery$ unsubscribes
    //   await ses.close()
    //   // spy.mockRestore()
    // });
  });

});
