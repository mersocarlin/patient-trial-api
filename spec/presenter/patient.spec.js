import { expect } from 'chai';

import { getRepositories } from '../spec-helper';
import presenter from '../../src/presenter/patient';
import * as service from '../../src/services/patient';

let patients;

describe('patient-presenter', () => {
  before(async function () {
    patients = await service.list(getRepositories(), {});
  });

  describe('single-patient', () => {
    it('should remove extra db properties from patient', async function () {
      const patient = presenter(patients[0]);
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
  });

  describe('list', () => {
    it('should remove extra db properties from patient list', async function () {
      const patientList = presenter(patients);
      patientList
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
    });
  });
});
