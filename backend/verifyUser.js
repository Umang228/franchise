const jwt = require('jsonwebtoken');
const jwtSecret = 'lecturevecture';

const verifyUser = (token) => {
  // return new Promise((resolve, reject) => {
  //   jwt.verify(token, jwtSecret, (err, decoded) => {
  //     if (err) {
  //       reject('Error in verifying credentials');
  //     } else {
  //       resolve(decoded);
  //     }
  //   });
  // });
};

module.exports = verifyUser;
