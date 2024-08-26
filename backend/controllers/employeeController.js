
const { getPaginatedEmployees, filterEmployeesByDepartment, sortEmployeesByJoiningDate, getFilteredAndSortedEmployees } = require('../services/employeeService');
const { successResponse, errResponse } = require('../utils/responseHandler');
const { DATA_FETCH_SUCCESS, NO_RECORDS_FOUND } = require('../utils/commonMessages');
const { OK, BAD_REQUEST } = require('../utils/httpCodes');
const employees = require('../data/employees');


const calculateTotalPages = (totalRecords, pageSize) => {
  return Math.ceil(totalRecords / pageSize);
};

const getEmployees = (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  const paginatedEmployees = getPaginatedEmployees(employees, startIndex, endIndex);
  const totalRecords = employees.length;
  const totalPages = calculateTotalPages(totalRecords, limit);

  return successResponse(res, OK, OK, DATA_FETCH_SUCCESS, {
    page_number: parseInt(page),
    page_size: parseInt(limit),
    total_record_count: totalRecords,
    total_pages: totalPages,
    records: paginatedEmployees
  });
};

const getEmployeesByDepartment = (req, res) => {
  const { department } = req.query;
  const { page = 1, limit = 10 } = req.query;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  if (!department) {
    return errResponse(res, BAD_REQUEST, BAD_REQUEST, 'Department query parameter is required');
  }

  const filteredEmployees = filterEmployeesByDepartment(department);
  const paginatedEmployees = getPaginatedEmployees(filteredEmployees, startIndex, endIndex);
  const totalRecords = filteredEmployees.length;
  const totalPages = calculateTotalPages(totalRecords, limit);

  return successResponse(res, OK, OK, DATA_FETCH_SUCCESS, {
    page_number: parseInt(page),
    page_size: parseInt(limit),
    total_record_count: totalRecords,
    total_pages: totalPages,
    records: paginatedEmployees
  });
};

const getSortedEmployees = (req, res) => {
  const { order = 'asc' } = req.query;
  const { page = 1, limit = 10 } = req.query;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  const { totalRecords, data: sortedEmployees } = getFilteredAndSortedEmployees(null, order);
  const paginatedEmployees = getPaginatedEmployees(sortedEmployees, startIndex, endIndex);
  const totalPages = calculateTotalPages(totalRecords, limit);

  return successResponse(res, OK, OK, DATA_FETCH_SUCCESS, {
    page_number: parseInt(page),
    page_size: parseInt(limit),
    total_record_count: totalRecords,
    total_pages: totalPages,
    records: paginatedEmployees
  });
};

module.exports = {
  getEmployees,
  getEmployeesByDepartment,
  getSortedEmployees,
};
