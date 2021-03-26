const express = require('express');

const app = express();
const jwt = require('express-jwt');
const jwks = require('jwks-rsa');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const routes = require('./routes/routes.js');
const config = require('./utils/config');

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true,
}));

const PORT = process.env.PORT || 8003;

morgan.token('body', (req) => JSON.stringify(req.body));
app.use(
  morgan(
    ':method :url :status :response-time ms - :res[content-length] :body - :req[content-length]',
  ),
);

const jwtCheck = jwt({
  secret: jwks.expressJwtSecret(config.jwtSecretConfig),
  ...config.jwtCheckConfig,
});

app.use(jwtCheck);

app.use('/api/v1', routes);

app.listen(PORT, () => {
  console.log(`Server listening on port, ${PORT}`);
});
