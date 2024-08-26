
const errResponse = (res, statusCode, response_code, error) => {
    res.status(statusCode).json({
      response_code,
      response_message: "error",
      error,
    });
  };
  
  const successResponse = (res, statusCode, response_code, response_message, data, extraData = {}) => {
    res.status(statusCode).json({
      response_code,
      response_message,
      ...extraData,
      data,
    });
  };
  
  module.exports = {
    errResponse,
    successResponse,
  };
  