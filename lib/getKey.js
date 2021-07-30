// 'use strict';

// const jwksClient = require('jwks-rsa');

// const client = jwksClient({
//   jwksUri: 'https://dev-6xlimb1s.us.auth0.com/.well-known/jwks.json'
// })


// module.exports = (header, callback) => {
//   client.getSigningKey(header.kid, function(err, key) {
//     var signingKey = key.publicKey || key.rsaPublicKey;
//     callback(null, signingKey);
//   });  
// } 


// function getKey(header, callback) {
//   client.getSigningKey(header.kid, function(err, key) {
//     var signingKey = key.publicKey || key.rsaPublicKey;
//     callback(null, signingKey);
//   });  
// } 