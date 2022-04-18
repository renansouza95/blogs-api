require('dotenv').config();
const jwt = require('jsonwebtoken');

const jwtConfig = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

const generateToken = (email) => jwt.sign({ data: email }, process.env.JWT_SECRET, jwtConfig);

const decodeToken = (authorization) => jwt.verify(authorization, process.env.JWT_SECRET);

module.exports = { generateToken, decodeToken };