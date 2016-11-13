export default function (data) {
  if (Array.isArray(data)) {
    return list(data);
  }

  return detail(data);
}


function list (patients) {
  const result = patients
    .map(t => detail(t));

  return result;
}


function detail (patient) {
  return {
    id: patient._id, // eslint-disable-line no-underscore-dangle
    createdAt: patient.createdAt,
    updatedAt: patient.updatedAt,
    gender: patient.gender,
    firstname: patient.firstname,
    lastname: patient.lastname,
    email: patient.email,
    phone: patient.phone,
    age: patient.age,
    zip: patient.zip,
    termsAccepted: patient.termsAccepted,
  };
}
