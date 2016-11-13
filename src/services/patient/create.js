import { BadRequestError } from 'meaning-error';
import validate from './validate';


export default async function create (repositories, data) {
  const patient = createData(data);
  await validate(patient);

  const applicationExists = await repositories.patient.existPatient(patient);
  if (applicationExists) {
    throw new BadRequestError('You have already submitted an application form.');
  }

  return await repositories
    .patient
    .create(patient);
}

function createData (data) {
  const now = new Date();

  return {
    active: true,
    createdAt: now,
    updatedAt: now,
    gender: data.gender,
    firstname: data.firstname,
    lastname: data.lastname,
    email: data.email,
    phone: data.phone,
    age: data.age,
    zip: data.zip,
    termsAccepted: data.termsAccepted,
  };
}
