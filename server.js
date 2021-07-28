'use strict';

// const mongoose = require('mongoose');

require('dotenv').config();

const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const jwksClient = require('jwks-rsa');
// const { mongoose } = require('mongoose');

const client = jwksClient({
  jwksUri: 'https://dev-6xlimb1s.us.auth0.com/.well-known/jwks.json'
});

// mongoose.connect(process.env.MONGODB_URI).then( () => {
//   console.log('test success');
// })

const app = express();

const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());





function getKey(header) {
  client.getSigningKey(header.kid, function(err, key) {
    var signingKey = key.publicKey || key.rsaPublicKey;
    callback(null, signingKey);
  });
}


app.get('/auth-test', (req, res) => {

  // TODO: 
  // STEP 1: get the jwt from the headers
  // STEP 2. use the jsonwebtoken library to verify that it is a valid jwt
  // jsonwebtoken dock - https://www.npmjs.com/package/jsonwebtoken
  // STEP 3: to prove that everything is working correctly, send the opened jwt back to the front-end


  const token = req.headers.authorization.split(' ')[1];

  jwt.verify(token, getKey, {}, function(err, user) {
    if (err) {
      res.send('invalid token - you cannot access this route');
    } else {
      res.json({ 'token': token })
    }
});
});
  

app.listen(PORT, () => {
console.log(`listening on ${PORT}`);
});
