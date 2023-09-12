const JWT_KEY = 'rahasia'
const jwt = require('jsonwebtoken')

function generateToken(user) {
    const { id, username, email, role } = user;
    return jwt.sign({id, username, email, role}, JWT_KEY);
  }
  
function verifyAccessToken(access_token){
    return jwt.verify(access_token, JWT_KEY);
}

module.exports = { generateToken, verifyAccessToken }