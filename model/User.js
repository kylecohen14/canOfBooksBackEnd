'use strict';
const mongoose = require('mongoose');


const bookSchema = new mongoose.Schema({
  name: {type: String, required: true },
  description: {type: String, required: true },
  status: {type: String}
  // , enum: ['read', 'liked', 'disliked']
  // img: {type: String, required: true}
})
const userSchema = new mongoose.Schema({
  name: {type: String, required: true},
  email: {type: String, required: true },
  books: [bookSchema]
})
const UserModel = mongoose.model('User', userSchema);
module.exports = UserModel;
// module.exports = mongoose.model('users', userSchema)