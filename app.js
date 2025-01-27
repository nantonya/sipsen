const express = require('express');
const cors = require('cors');
const routerApi = require('./src/routes');
const { config } = require('./config');

const { logErrors, errorHandler, boomErrorHandler, ormErrorHandler } = require('./src/middlewares/error.handler');

const app = express();
const port = config.port;

app.use(express.json());

const whitelist = ['http://localhost:8080', 'https://myapp.co'];
const options = {
  origin: (origin, callback) => {
    if (whitelist.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('no permitido'));
    }
  }
}
app.use(cors(options));

routerApi(app);

app.use(logErrors);
app.use(ormErrorHandler);
app.use(boomErrorHandler);
app.use(errorHandler);


app.listen(port, () => {
  console.log('Mi port ' +  port);
});
