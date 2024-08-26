
const paginationMiddleware = (req, res, next) => {
    const { page = 1, limit = 10 } = req.query;
    
    req.pagination = {
      page: parseInt(page),
      limit: parseInt(limit),
      startIndex: (parseInt(page) - 1) * parseInt(limit),
      endIndex: parseInt(page) * parseInt(limit),
    };
  
    next();
  };
  
  module.exports = paginationMiddleware;
  