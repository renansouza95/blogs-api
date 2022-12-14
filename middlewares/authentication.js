const Token = require('./token');
const userSchema = require('./joi/users');
const loginSchema = require('./joi/login');
const categorySchema = require('./joi/categories');
const postShema = require('./joi/blogpost');

const authenticateUser = (req, res, next) => {
  const { error } = userSchema.validate(req.body);
  if (error) return res.status(400).json({ message: error.message });
  next();
};

const authenticateLogin = (req, res, next) => {
  const { error } = loginSchema.validate(req.body);
  if (error) return res.status(400).json({ message: error.message });
  next();
};

const authenticateCategory = (req, res, next) => {
  const { error } = categorySchema.validate(req.body);
  if (error) return res.status(400).json({ message: error.message });
  next();
};

const authenticatePost = (req, res, next) => {
  const { error } = postShema.create.validate(req.body);
  if (error) return res.status(400).json({ message: error.message });
  next();
};

const authenticateUpdate = (req, res, next) => {
  const { error } = postShema.update.validate(req.body);
  if (error) return res.status(400).json({ message: error.message });
  next();
};

const validateToken = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) return res.status(401).json({ message: 'Token not found' });
  try {
    Token.decodeToken(authorization);
  } catch (error) {
    return res.status(401).json({ message: 'Expired or invalid token' });
  }
  next();
};

module.exports = {
  authenticateUser,
  authenticateLogin,
  authenticateCategory,
  authenticatePost,
  authenticateUpdate,
  validateToken,
};