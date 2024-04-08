const express = require('express');

const sipsenRouter = require('./sipsen.controller');


function routerApi(app) {
  const router = express.Router();
  app.use('/api/v1', router);
  router.use('/sipsen', sipsenRouter);
}

module.exports = routerApi;
