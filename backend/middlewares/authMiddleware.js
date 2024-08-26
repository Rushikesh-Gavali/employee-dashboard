const jwt = require('jsonwebtoken');
const {errResponse} = require('../utils/responseHandler');
const { UNAUTHORIZED } = require('../utils/httpCodes');
const { UNAUTHORIZED: UNAUTHORIZED_MSG } = require('../utils/commonMessages');

const authenticate = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return errResponse(res, UNAUTHORIZED, UNAUTHORIZED, UNAUTHORIZED_MSG);
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return errResponse(res, UNAUTHORIZED, UNAUTHORIZED, UNAUTHORIZED_MSG);
  }
};

module.exports = authenticate;
