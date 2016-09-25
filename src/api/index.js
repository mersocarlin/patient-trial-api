import ping from './ping';


export default (app) => {
  app.get('/api/ping', ping.list);

  app.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
    console.error(err.stack || err); // eslint-disable-line no-console

    if (err) {
      res.sendStatus(500);
    }
  });
};
