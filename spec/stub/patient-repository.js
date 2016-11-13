import mongoose from 'mongoose';
import { NotFoundError } from 'meaning-error';

import patientFixtures from '../fixtures/patient';

const ObjectId = mongoose.Types.ObjectId;
let list = [];

export default function patientRepository () {
  initDb();

  return {
    create: function (obj) {
      const newObj = {
        _id: ObjectId(),
        ...obj
      };

      list.push(newObj);

      return newObj;
    },
    existPatient: function (patient) {
      return list
        .filter(p => this.buildExistQuery(p, patient))
        .length > 0;
    },
    findAll: function (query) {
      return list
        .filter(p => this.buildQuery(p, query));
    },
    findById: function (id) {
      return list
        .filter(p => this.filterByActive(p))
        .find(p => p._id.toString() === id.toString());
    },
    update: function (id, dbPatient) {
      const index = list.findIndex(p => p._id === id);
      list[index] = dbPatient;

      return dbPatient;
    },
    remove: function (id) {
      const index = list.findIndex(p => p._id === id);
      list[index].active = false;

      return true;
    },
    buildExistQuery (patient, obj) {
      return (
        this.filterByActive(patient) &&
        patient.firstname === obj.firstname &&
        patient.lastname === obj.lastname &&
        patient.email === obj.email &&
        patient.phone === obj.phone &&
        patient.age === obj.age &&
        patient.zip === obj.zip
      );
    },
    buildQuery (patient, { query }) {
      return (
        this.filterByActive(patient) &&
        this.filterByQuery(patient, query)
      );
    },
    filterByActive (patient) {
      return patient.active;
    },
    filterByQuery (patient, query) {
      if (!query) return true;

      return (
        patient.firstname.toLowerCase().indexOf(query.toLowerCase()) !== -1 ||
        patient.lastname.toLowerCase().indexOf(query.toLowerCase()) !== -1 ||
        patient.email.toLowerCase().indexOf(query.toLowerCase()) !== -1
      );
    },
  }
}

function initDb () {
  if (list.length) return;
  patientFixtures.forEach(p => list.push(p));
}
