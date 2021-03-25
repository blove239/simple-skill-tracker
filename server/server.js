const express = require('express');
const app = express();
const jwt = require('express-jwt');
const jwks = require('jwks-rsa');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan')

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

const PORT = process.env.PORT || 8003;

morgan.token("body", (req, res) => JSON.stringify(req.body));
app.use(
  morgan(
    ":method :url :status :response-time ms - :res[content-length] :body - :req[content-length]"
  )
);

const jwtCheck = jwt({
    secret: jwks.expressJwtSecret({
        cache: true,
          rateLimit: true,
          jwksRequestsPerMinute: 5,
          jwksUri: 'https://dev-11l9mafb.auth0.com/.well-known/jwks.json'
    }),
    audience: 'localhost:8003/',
    issuer: 'https://dev-11l9mafb.auth0.com/',
    algorithms: ['RS256']
});

app.use(jwtCheck);

app.get('/authorized', function (req, res) {
    console.log(req.user)
    res.send({message:'Secured Resource'});
});

app.listen(PORT, ()=> {
    console.log(`Server listening on port, ${PORT}`)
});