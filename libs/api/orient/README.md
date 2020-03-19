# @slackmap/api/orient

Docs: [orientdb.org/docs/3.0.x/orientjs](https://orientdb.org/docs/3.0.x/orientjs/OrientJS.html)

## Driver theory

Example chat app for OrientJS v3: [github.com/orientechnologies/orientjs-example/blob/master/orientjs-chat-example-async-await](https://github.com/orientechnologies/orientjs-example/blob/master/orientjs-chat-example-async-await/index.js)

Steps:

- At the bootstrap of your application
  - const client = await OrientDBClient.connect()
  - const pool = await client.sessions()
- Handling the request
  - const session = await pool.acquire();
  - await session.command("create class Room IF NOT EXISTS extends").one();
  - await session.close();
- At the shutdown of the application
  - await pool.close()
  - await client.close()

## Example mongo workflow with Observables

https://github.com/yjaaidi/ng-experiments/blob/http-request-cancelation/apps/api/src/app/mongo-find.ts

## Running unit tests

Run `ng test api-orient` to execute the unit tests via [Jest](https://jestjs.io).
