const express = require('express');
const { getEmployees, getEmployeesByDepartment, getSortedEmployees } = require('../controllers/employeeController');
const authenticate = require('../middlewares/authMiddleware');
const paginationMiddleware = require('../middlewares/paginationMiddleware');

const router = express.Router();

router.get('/', authenticate, paginationMiddleware, getEmployees);
router.get('/filter', authenticate, paginationMiddleware, getEmployeesByDepartment);
router.get('/sort', authenticate, paginationMiddleware, getSortedEmployees);

module.exports = router;
