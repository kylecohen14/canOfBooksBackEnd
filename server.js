'use strict';

// const mongoose = require('mongoose');

require('dotenv').config();

const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const jwksClient = require('jwks-rsa');
const app = express();
const mongoose = require('mongoose');
const PORT = process.env.PORT || 3001;
const User = require('./model/User.js');
;

app.use(cors());
app.use(express.json());

const client = jwksClient({
  jwksUri: 'https://dev-6xlimb1s.us.auth0.com/.well-known/jwks.json'
});

const mongooseOptions = { useNewUrlParser: true, useUnifiedTopology: true }
mongoose.connect('mongodb://localhost:27017/books-db', mongooseOptions)

 






// ----------------------------------------------
// users books

let kyle = new User({name: 'Ricky', email: 'kylecohen14@gmail.com', books: [{name: 'How to think like a fish', description: 'Learn to think like a fish thinks', status: 'Read'}, {name: 'The total fishing manual', description: 'How to catch fish', status: 'Read'}, {name: 'Encyclopedia of fishing', description: 'Complete guide to the fihs, tackle, and techniques of fresh & saltwater angling', status: 'have not read'}]
})
kyle.save();



// -------------------------------------------------
// need an app.post books to push in books
app.post('/books', (req, res) => {
  let newUser = new User(req.body);
  newUser.save()
    .then(result => {
      res.json(result);
    })
})

app.get('/books', getAllBooks);

function getAllBooks(req, res) {
  User.find({})
    .then(books => {
      res.json(books);
    })
}


function getKey(header, callback) {
  client.getSigningKey(header.kid, function(err, key) {
    var signingKey = key.publicKey || key.rsaPublicKey;
    callback(null, signingKey);
  });  
} 

app.get('/auth-test', (req, res) => {
//   res.json({ samepleUser: ( { name: 'ricky'}, { person: 'bobby'} ) })
// });
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
