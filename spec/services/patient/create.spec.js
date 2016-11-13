import { expect } from 'chai';
import * as service from '../../../src/services/patient';
import { getRepositories } from '../../spec-helper';


describe('patient-service', () => {
  let repositories;

  before(async function () {
    repositories = getRepositories();
  });

  describe('create', () => {
    it('should create patient', async function () {
      const data = {
        gender: 'male',
        firstname: 'Huey',
        lastname: 'Duck',
        email: 'huey@duck.com',
        phone: '0987654321',
        age: 6,
        zip: '12345',
        termsAccepted: true,
      };

      const patient = await service.create(repositories, data);
      expect(patient).to.have.property('_id');
      expect(patient).to.have.property('active', true);
      expect(patient).to.have.property('createdAt');
      expect(patient).to.have.property('updatedAt');
      expect(patient).to.have.property('firstname', 'Huey');
      expect(patient).to.have.property('lastname', 'Duck');
      expect(patient).to.have.property('email', 'huey@duck.com');
      expect(patient).to.have.property('phone', '0987654321');
      expect(patient).to.have.property('age', 6);
      expect(patient).to.have.property('zip', '12345');
      expect(patient).to.have.property('termsAccepted', true);
    });

    it('should throw when sending a second application', async function () {
      const data = {
        gender: 'male',
        firstname: 'Huey',
        lastname: 'Duck',
        email: 'huey@duck.com',
        phone: '0987654321',
        age: 6,
        zip: '12345',
        termsAccepted: true,
      };

      let hasError = false;
      try {
        await service.create(repositories, data);
      } catch (e) {
        hasError = true;
        expect(e.name).to.be.equal('BadRequestError');
        expect(e.message).to.be.equal('You have already submitted an application form.');
        expect(e.code).to.be.equal(400);
      }
      expect(hasError).to.be.equal(true);
    });

    it('should create patient with object containing extra properties', async function () {
      const data = {
        gender: 'male',
        firstname: 'Dewey',
        lastname: 'Duck',
        email: 'dewey@duck.com',
        phone: '0987654321',
        age: 6,
        zip: '12345',
        termsAccepted: true,
        arg1: 1,
        arg2: '2',
        arg3: true,
        arg4: new Date(),
      };

      const patient = await service.create(repositories, data);
      expect(patient).to.have.property('active', true);
      expect(patient).to.have.property('createdAt');
      expect(patient).to.have.property('updatedAt');
      expect(patient).to.have.property('firstname', 'Dewey');
      expect(patient).to.have.property('lastname', 'Duck');
      expect(patient).to.have.property('email', 'dewey@duck.com');
      expect(patient).to.have.property('phone', '0987654321');
      expect(patient).to.have.property('age', 6);
      expect(patient).to.have.property('zip', '12345');
      expect(patient).to.have.property('termsAccepted', true);
      expect(patient).to.not.have.property('arg1');
      expect(patient).to.not.have.property('arg2');
      expect(patient).to.not.have.property('arg3');
      expect(patient).to.not.have.property('arg4');
    });
  });
});
