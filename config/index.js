import mongoose from 'mongoose';

import { default as env } from './env';
import { default as model } from '../db/models/patient';
import patientRepository from '../src/repository/patient';

export default {
  env,
  repositories: {
    patient: patientRepository(model),
  },
};
