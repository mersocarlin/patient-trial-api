import express from 'express';
import bodyParser from 'body-parser';


import api from './api';


export async function application (config) {
  const app = express();

  app.set('config', config);
  app.use(bodyParser.json());

  api(app);

  return app;
}


export const start = (config) => new Promise(async resolve => {
  const app = await application(config);
  const { env: { http: { host, port } } } = config;
  
  app.listen(port, host, () => {
    /* eslint-disable no-console */
    console.info(`patient-trial-api started at [ http://${host}:${port} ]`);

    resolve();
  });
});
