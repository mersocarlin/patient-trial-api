import meaningError from 'meaning-error-middleware';

import ping from './ping';
import * as patient from './v1/patient';

const wrap = fn => (...args) => fn(...args).catch(args[2]);

export default (app) => {
  app.get('/api/ping', ping.list);
  app.get('/api/v1/patients', wrap(patient.list));
  app.post('/api/v1/patients', wrap(patient.create));

  app.use(meaningError);
  app.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
    console.error(err.stack || err); // eslint-disable-line no-console

    if (err) {
      res.sendStatus(500);
    }
  });
};
