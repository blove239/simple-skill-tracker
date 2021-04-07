const express = require('express');

const app = express();
const jwt = require('express-jwt');
const jwks = require('jwks-rsa');
const cors = require('cors');
const path = require('path');
const morgan = require('morgan');
const mongoose = require('mongoose');
const api = require('./api');
const config = require('./utils/config');
require('dotenv').config();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({
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

app.use('/api/v1', jwtCheck, api);

app.use(express.static(path.resolve(__dirname, 'dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/dist/index.html'));
});

const uri = process.env.MONGO_URI;

const listen = () => {
  app.listen(PORT, () => {
    console.log(`Server listening on port, ${PORT}`);
  });
};

const connect = () => {
  mongoose.connection
    .on('error', console.log)
    .on('disconnected', connect)
    .once('open', listen);
  return mongoose.connect(uri, {
    keepAlive: 1,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

connect();
