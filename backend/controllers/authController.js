const { loginUser } = require('../services/authService');
const { successResponse, errResponse } = require('../utils/responseHandler');
const { LOGIN_SUCCESS, LOGIN_FAILED } = require('../utils/commonMessages');
const { OK, UNAUTHORIZED } = require('../utils/httpCodes');
const validator = require('validator');

const login = (req, res) => {
  const { email, password } = req.body;

  // Validate email
  if (!validator.isEmail(email)) {
    return errResponse(res, UNAUTHORIZED, UNAUTHORIZED, 'Invalid email format');
  }

  // Validate password length
  if (!validator.isLength(password, { min: 6 })) {
    return errResponse(res, UNAUTHORIZED, UNAUTHORIZED, 'Password must be at least 6 characters long');
  }

  const { token, user_name } = loginUser(email, password);

  if (!token) {
    return errResponse(res, UNAUTHORIZED, UNAUTHORIZED, LOGIN_FAILED);
  }

  return successResponse(res, OK, OK, LOGIN_SUCCESS, { token, user_name });
};

module.exports = {
  login,
};
