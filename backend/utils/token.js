const jwt = require("jsonwebtoken");
require('dotenv')
// console.log(process.env)


const createAccessToken = (payload) => {
  return jwt.sign(payload, 'jwt_secret_key');
}
// console.log(process.env.ACCESS_TOKEN_SECRET)

module.exports = {
  createAccessToken,
}