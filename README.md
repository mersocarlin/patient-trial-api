# patient-trial-api [![Travis][build-badge]][build]

Prototype for patient-trial-api.

## Development

1. JavaScript as programming language.
2. [NodeJS](https://nodejs.org/en/) and [ExpressJS](http://expressjs.com/) as web framework.
3. [npm](https://www.npmjs.com/) as package dependency management. [Yarn](https://yarnpkg.com/) is also possible to use if you have it installed.
4. [Mocha](https://mochajs.org/) as testing framework along side [chaijs](http://chaijs.com/) and [supertest](https://github.com/visionmedia/supertest).
5. [Docker](https://www.docker.com/) as containerization platform.
6. [Myself](http://www.mersocarlin.com) as incredible developer :)

### Running the api

```bash
npm install && npm start
```

The api will be available at <http://localhost:4000>

#### Tests

```bash
npm test
```

### Running the api on Docker

```bash
docker-compose run --rm --service-ports api npm install
docker-compose run --rm --service-ports api
```

#### Tests

```bash
docker-compose run --rm --service-ports test npm install
docker-compose run --rm --service-ports test
```

# License

MIT

[build-badge]: https://travis-ci.org/mersocarlin/patient-trial-api.svg
[build]: https://travis-ci.org/mersocarlin/patient-trial-api
