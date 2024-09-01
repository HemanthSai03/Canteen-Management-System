/* The code snippet provided is setting up a Node.js server using Express and Apollo Server for a
GraphQL API. Here's a breakdown of what the code is doing: */
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

module.exports = (req, res, next) => {
  const authHeader = req.get('Authorization');
  if (!authHeader) {
    return next();
  }
  const token = authHeader.split(' ')[1];
  if (!token) {
    return next();
  }
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    return next();
  }
  if (!decodedToken) {
    return next();
  }
  req.userId = decodedToken.userId;
  req.role = decodedToken.role;
  next();
};
