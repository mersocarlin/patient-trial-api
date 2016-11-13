import presenter from '../../../presenter/patient';
import * as patient from '../../../services/patient';


export async function list (req, res) {
  res
    .status(200)
    .send(
      presenter(
        await patient.list(
          req.repositories,
          req.query
        )
      )
    );
}

export async function create (req, res) {
  res
    .status(201)
    .send(
      presenter(
        await patient.create(
          req.repositories,
          req.body,
        )
      )
    );
}
