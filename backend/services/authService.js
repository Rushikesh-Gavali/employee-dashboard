const jwt = require('jsonwebtoken');
const users = require('../data/users');

const loginUser = (email, password) => {
  const user = users.find(u => u.email === email);

  if (!user) {
    return { token: null, name: null };
  }

  const isMatch = password === user.password;
  if (!isMatch) {
    return { token: null, name: null };
  }

  const token = jwt.sign(
    { email: user.email, name: user.name },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN }
  );

  return { token, user_name: user.name };
};

module.exports = {
  loginUser,
};
