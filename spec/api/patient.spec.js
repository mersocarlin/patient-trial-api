import { expect } from 'chai';
import request from 'supertest';

import { createBigString, getRepositories } from '../spec-helper';
import { application } from '../../src/';
import * as service from '../../src/services/patient';
import { default as env } from '../../config/env';


describe('patients api', () => {
  let app;
  let patients;

  before(async function () {
    const repositories = getRepositories();

    app = await application({ env, repositories });

    patients = await service.list(repositories, {});
  });

  describe('list', () => {
    it('should list all active patients', (done) => {
      request(app)
        .get('/api/v1/patients')
        .expect(200)
        .end((err, res) => {
          if (err) {
            done(err);
            return;
          }

          expect(res.body).to.be.instanceof(Array);
          expect(res.body).to.not.be.empty;
          res.body
            .forEach(patient => {
              expect(patient).to.have.property('id');
              expect(patient).to.have.property('createdAt');
              expect(patient).to.have.property('updatedAt');
              expect(patient).to.have.property('gender');
              expect(patient).to.have.property('firstname');
              expect(patient).to.have.property('lastname');
              expect(patient).to.have.property('email');
              expect(patient).to.have.property('phone');
              expect(patient).to.have.property('age');
              expect(patient).to.have.property('zip');
              expect(patient).to.have.property('termsAccepted');
            });
          done();
        });
    });

    it('show list all active patients containing duck on their names', (done) => {
      request(app)
        .get('/api/v1/patients?query=duck')
        .expect(200)
        .end((err, res) => {
          if (err) {
            done(err);
            return;
          }

          expect(res.body).to.be.instanceof(Array);
          expect(res.body).to.not.be.empty;
          res.body
            .forEach(patient => {
              expect(
                patient.firstname.toLowerCase().indexOf('duck') !== -1 ||
                patient.lastname.toLowerCase().indexOf('duck') !== -1 ||
                patient.email.toLowerCase().indexOf('duck') !== -1
              ).to.be.true;
            });
          done();
        });
    });

    it('show return empty list', (done) => {
      request(app)
        .get('/api/v1/patients?query=testing')
        .expect(200)
        .end((err, res) => {
          if (err) {
            done(err);
            return;
          }

          expect(res.body).to.be.instanceof(Array);
          expect(res.body).to.be.empty;
          done();
        });
    });
  });

  describe('create', () => {
    it('should throw error when sending invalid request body', (done) => {
      request(app)
        .post('/api/v1/patients')
        .send({})
        .expect(400)
        .end((err, res) => {
          if (err) {
            done(err);
            return;
          }

          expect(res.body).to.have.property('error_name');
          expect(res.body).to.have.property('error_message');
          expect(res.body).to.have.property('status_code');
          expect(res.body.error_name).to.be.equal('BadRequestError');
          expect(res.body.error_message).to.be.equal('Please inform your gender.');
          expect(res.body.status_code).to.be.equal(400);
          done();
        });
    });

    it('should create patient', (done) => {
      request(app)
        .post('/api/v1/patients')
        .send({
          gender: 'male',
          firstname: 'Dewey',
          lastname: 'Duck',
          email: 'dewey@duck.com',
          phone: '00987345',
          age: 6,
          zip: '12345',
          termsAccepted: true,
        })
        .expect(201)
        .end((err, res) => {
          if (err) {
            done(err);
            return;
          }

          expect(res.body).to.have.property('id');
          expect(res.body).to.have.property('createdAt');
          expect(res.body).to.have.property('updatedAt');
          expect(res.body).to.have.property('firstname', 'Dewey');
          expect(res.body).to.have.property('lastname', 'Duck');
          expect(res.body).to.have.property('email', 'dewey@duck.com');
          expect(res.body).to.have.property('phone', '00987345');
          expect(res.body).to.have.property('age', 6);
          expect(res.body).to.have.property('zip', '12345');
          expect(res.body).to.have.property('termsAccepted', true);

          done();
        });
    });

    it('should throw when sending a second application', (done) => {
      request(app)
        .post('/api/v1/patients')
        .send({
          gender: 'male',
          firstname: 'Dewey',
          lastname: 'Duck',
          email: 'dewey@duck.com',
          phone: '00987345',
          age: 6,
          zip: '12345',
          termsAccepted: true,
        })
        .expect(400)
        .end((err, res) => {
          if (err) {
            done(err);
            return;
          }

          expect(res.body).to.have.property('error_name', 'BadRequestError');
          expect(res.body).to.have.property('error_message', 'You have already submitted an application form.');
          expect(res.body).to.have.property('status_code', 400);

          done();
        });
    });
  });
});
