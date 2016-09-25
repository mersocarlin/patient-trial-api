import { expect } from 'chai';
import request from 'supertest';

import { application } from '../../src/';
import { default as env } from '../../config/env';


describe('ping api', () => {
  let app;

  before(async function () {
    app = await application({ env });
  });

  describe('/ping', () => {
    it('should return array for /api/ping', done => {
      request(app)
        .get('/api/ping')
        .expect(200)
        .end((err, res) => {
          if (err) {
            done(err);
            return;
          }

          expect(res.body).to.be.instanceof(Array);
          res.body
            .forEach((obj, index) => {
              expect(obj).to.have.property('status', index);
            });
          done();
        });
    });

    it('show throw not found', done => {
      request(app)
        .get('/api/notfound')
        .expect(404)
        .end(done);
    });
  });
});
