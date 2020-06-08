<a href="https://next.slackmap.com" target="_blank"><img src="https://next.slackmap.com/assets/logo-hor-sub.svg" style="max-height: 200px;display: block;margin: auto;"></a>

# SlackMap

The place where you can share you sport activity, dicover new people and places to train.

## Infractructure

### Production

[slackmap.com](https://slackmap.com) is production domain serving first version of the app based on AngularJS + Express + OrientDb, this is private code.

Use it and share your SlackLine spots with others, this is productiona database.

### Development

[next.slackmap.com](https://next.slackmap.com) is development version with fake test database, you can play and do what you want here.

## Production vs Development

Production code is private and is no longer maintained and will be dropped when Development of new version will be out.

This monorepo contains backend and frontend code for the new version.

## OpenSource

We OpenSourced the project so you can fork us: [https://github.com/SlackMap/slackmap](https://github.com/SlackMap/slackmap)

Use [develop](https://github.com/SlackMap/slackmap/tree/develop) branch for now to see current codebase.

The [master](https://github.com/SlackMap/slackmap/tree/develop) branch is waiting for the `develop` branch to be ready for production. Don't use it for now!

## Next Version

New version is full code rewrite with technology updates: 

* `JavaScript` >>> **TypeScript**, 
* `AngularJS` >>> **Angular**, 
* `Redux + redux-observable` >>> **NgRx**, 
* `Express + TSOA` >>> **NestJS**
* `OrientDB` >>> **Neo4j**
* `Multiple repositories` >>> **Nx Workspaces monorepo**
* `Private code base` >>> **OpenSource**
* `SlackLine only` >>> **Multiple Sports**

We use [Angular CLI](https://github.com/angular/angular-cli) using [Nrwl Nx Workspace](https://nrwl.io/nx).

## Developer Guide

[slackmap.github.io/slackmap](https://slackmap.github.io/slackmap)

## License

This code is distributed under [ GNU GPLv3](LICENSE)

