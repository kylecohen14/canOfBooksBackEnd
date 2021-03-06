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

// const getKey = require('../lib/getKey.js');
// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^



app.use(cors());
app.use(express.json());

const client = jwksClient({
  jwksUri: 'https://dev-6xlimb1s.us.auth0.com/.well-known/jwks.json'
});

const mongooseOptions = { useNewUrlParser: true, useUnifiedTopology: true }
mongoose.connect(process.env.MONGODB_URI, mongooseOptions)
// 'mongodb://localhost:27017/books-db'

// User.collection.drop();


// ----------------------------------------------
// users books

let kyle = new User({name: 'Ricky', email: 'kylecohen14@gmail.com', books: [{name: 'How to think like a fish', description: 'Learn to think like a fish thinks', status: 'Read'}, {name: 'The total fishing manual', description: 'How to catch fish', status: 'Read'}, {name: 'Encyclopedia of fishing', description: 'Complete guide to the fihs, tackle, and techniques of fresh & saltwater angling', status: 'have not read'}]
})
kyle.save();




// -------------------------------------------------
//  need app.
// get / post/ put / delete
// app. put and delete get ('/books/:id')



// app.get ('/books', (req, res) => {
  //   let newUser = new User(req.body);
  //   newUser.save()
  //   .then(result => {
    //     res.json(result);
    //   })
    // })
    
    app.post('/books', (req, res) => {
      console.log(req.body)
      const {email, name, description, status} = req.body;
      User.findOne({email:email})
      .then(user => {
        console.log(user)
        user.books.push(
          {name:name, description:description, status:status}
        )
       user.save()
        res.json(user);
      }).catch(err => console.error(err))
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

app.get('/profile', (req, res) => {
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
  
// app.use('*', (req, res) => {
//   res.status(404).send('route not found')
// });

app.listen(PORT, () => {
console.log(`listening on ${PORT}`);
});
