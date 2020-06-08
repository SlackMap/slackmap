// import {errorHandler as handler} from './filters/exception-filter';
// import {Express, Request, Response, NextFunction} from 'express';
// import {EnvConfig} from '../config/config';

// const error = require('http-errors');
// const express = require('express');
// const assert = require('assert');

describe.skip('errorHandler()', function() {
  test.skip('skip', () => {});
  //   let agent: ChaiHttp.Agent;
  //   before(() => {
  //     const app: Express = express();
  //     app.use('/500', function(req: Request, res: Response, next: NextFunction) {
  //       next(error(501, 'sorry for 501'));
  //     });
  //     app.use('/400', function(req: Request, res: Response, next: NextFunction) {
  //       next(
  //         error(401, 'lol', {
  //           type: 'a',
  //           code: 'b'
  //         })
  //       );
  //     });
  //     app.use(handler(EnvConfig.PROD));
  //     agent = chai.request.agent(app);
  //   });
  //   after(() => {
  //     agent.app.close();
  //   });
  //   it('should handle 5xx errors', function() {
  //     return agent
  //       .get('/500')
  //       .then(function(res) {
  //         expect(res).to.have.status(501);
  //         const body = res.body;
  //         assert.equal(body.message, 'Not Implemented');
  //         assert.equal(body.status, 501);
  //       })
  //       .catch(res => {
  //         expect(res).to.have.status(501);
  //         const body = res.response.body;
  //         assert.equal(body.message, 'Not Implemented');
  //         assert.equal(body.status, 501);
  //       });
  //   });
  //   it('should handle 4xx errors', function() {
  //     return agent
  //       .get('/400')
  //       .then(function(res) {
  //         expect(res).to.have.status(501);
  //         const body = res.body;
  //         assert.equal(body.message, 'Not Implemented');
  //         assert.equal(body.status, 501);
  //       })
  //       .catch(res => {
  //         expect(res).to.have.status(401);
  //         const body = res.response.body;
  //         assert.equal(body.message, 'lol');
  //         assert.equal(body.status, 401);
  //         assert.equal(body.type, 'a');
  //         assert.equal(body.code, 'b');
  //       });
  //   });
});
