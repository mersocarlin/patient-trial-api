import { expect } from 'chai';
import * as service from '../../../src/services/patient';
import { createBigString, getRepositories } from '../../spec-helper';


describe('patient-service', () => {
  let repositories;

  before(async function () {
    repositories = getRepositories();
  });

  describe('list', () => {
    it('show list all active patients', async function () {
      const list = await service.list(repositories, {});
      expect(list).to.be.instanceof(Array);
      expect(list).not.to.be.empty;
      list
        .forEach(patient => {
          expect(patient).to.have.property('active', true);
        });
    });

    it('show list all active patients containing duck on their names', async function () {
      const query = {
        query: 'duck',
      };

      const list = await service.list(repositories, query);

      expect(list).to.be.instanceof(Array);
      expect(list).not.to.be.empty;
      list
        .forEach(patient => {
          expect(
            patient.firstname.toLowerCase().indexOf('duck') !== -1 ||
            patient.lastname.toLowerCase().indexOf('duck') !== -1 ||
            patient.email.toLowerCase().indexOf('duck') !== -1
          ).to.be.true;
        });
    });

    it('show return empty list', async function () {
      const query = {
        query: 'testing',
      };

      const list = await service.list(repositories, query);
      expect(list).to.be.instanceof(Array);
      expect(list).to.be.empty;
    });
  });
});
