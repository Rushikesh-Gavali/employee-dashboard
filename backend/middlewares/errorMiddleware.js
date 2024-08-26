const {errResponse} = require('../utils/responseHandler');
const { INTERNAL_SERVER_ERROR } = require('../utils/httpCodes');

const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  errResponse(res, INTERNAL_SERVER_ERROR, INTERNAL_SERVER_ERROR, err.message);
};

module.exports = errorHandler;
