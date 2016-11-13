
export default function patientRepository (model) {
  return {
    create: create.bind(this, model),
    existPatient: existPatient.bind(this, model),
    findAll: findAll.bind(this, model),
    findById: findById.bind(this, model),
    update: update.bind(this, model),
    remove: remove.bind(this, model),
  };
}


async function create (model, patient) {
  return new Promise((resolve, reject) => {
    model.create(
      patient,
      (err, createdPatient) => {
        if (err) reject(err);
        resolve(createdPatient);
      }
    );
  });
}

async function existPatient (model, patient) {
  const filter = buildExistQuery(patient);

  return new Promise((resolve, reject) => {
    model
      .find(filter)
      .exec(async (err, patients) => {
        if (err) reject(err);

        resolve(patients.length > 0);
      });
  });
}

async function findAll (model, query) {
  const filter = buildQuery(query);

  return new Promise((resolve, reject) => {
    model
      .find(filter)
      .sort('-createdAt')
      .exec(async (err, patients) => {
        if (err) reject(err);

        resolve(patients);
      });
  });
}

async function findById (model, id) {
  return new Promise((resolve, reject) => {
    model
      .findOne({ _id: id, active: true })
      .exec(async (err, patient) => {
        if (err) reject(err);
        if (!patient) {
          resolve(null);
          return;
        }

        resolve(patient);
      });
  });
}

async function update (model, id, dbPatient) {
  return new Promise((resolve, reject) => {
    model.update(
      { _id: id },
      { $set: dbPatient },
      {},
      (err) => {
        if (err) reject(err);
        resolve(dbPatient);
      }
    );
  });
}

async function remove (model, id) {
  return new Promise((resolve, reject) => {
    model.update(
      { _id: id },
      {
        $set: {
          active: false,
        },
      },
      {},
      (err) => {
        if (err) reject(false);
        resolve(true);
      }
    );
  });
}

function buildExistQuery (patient) {
  return {
    $and: [
      filterByActive(),
      { gender: { $regex: new RegExp(patient.gender, 'i') } },
      { firstname: { $regex: new RegExp(patient.firstname, 'i') } },
      { lastname: { $regex: new RegExp(patient.lastname, 'i') } },
      { email: { $regex: new RegExp(patient.email, 'i') } },
      { phone: patient.phone },
      { age: patient.age },
      { zip: patient.zip },
    ],
  };
}

function buildQuery ({ query }) {
  return {
    $and: [
      filterByActive(),
      filterByQuery(query),
    ],
  };
}

function filterByActive () {
  return { active: true };
}

function filterByQuery (query) {
  if (!query) return {};

  return {
    $or: [
      {
        firstname: { $regex: new RegExp(query, 'i') },
      },
      {
        lastname: { $regex: new RegExp(query, 'i') },
      },
      {
        email: { $regex: new RegExp(query, 'i') },
      },
    ],
  };
}
