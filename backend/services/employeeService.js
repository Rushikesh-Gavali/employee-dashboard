
const employees = require('../data/employees');

const getPaginatedEmployees = (data, startIndex, endIndex) => {
  return data.slice(startIndex, endIndex);
};

const filterEmployeesByDepartment = (department) => {
  return employees.filter(emp => emp.department.toLowerCase() === department.toLowerCase());
};

const sortEmployeesByJoiningDate = (order) => {
  const validOrders = ['asc', 'desc'];
  if (!validOrders.includes(order)) {
    throw new Error('Invalid sort order');
  }

  const employeesCopy = [...employees];

  return employeesCopy.sort((a, b) => {
    const dateA = new Date(a.join_date);
    const dateB = new Date(b.join_date);
    return order === 'asc' ? dateA - dateB : dateB - dateA;
  });
};

const getFilteredAndSortedEmployees = (filter, sortOrder) => {
  let filteredEmployees = employees;

  if (filter) {
    filteredEmployees = filterEmployeesByDepartment(filter);
  }

  const sortedEmployees = sortEmployeesByJoiningDate(sortOrder);

  return {
    totalRecords: filteredEmployees.length,
    data: sortedEmployees
  };
};

module.exports = {
  getPaginatedEmployees,
  filterEmployeesByDepartment,
  sortEmployeesByJoiningDate,
  getFilteredAndSortedEmployees
};
