# Employee Management API

## Overview

The Employee Dashboard API is a Node.js and Express application that allows you to manage employee records with features such as pagination, filtering by department, and sorting by joining date. It also includes authentication using JSON Web Tokens (JWT) for secure access.

## Features

- **Pagination**: Fetch employee records with pagination support.
- **Filtering**: Filter employee records by department.
- **Sorting**: Sort employee records by joining date in ascending or descending order.
- **Authentication**: Secure endpoints using JWT.
- **Error Handling**: Comprehensive error responses using errorHandlers.

## Folder Structure

- **`controllers/`**: Contains functions to handle incoming HTTP requests and send responses.
- **`data/`**: Includes dummy employee data.
- **`services/`**: Contains business logic and data manipulation functions.
- **`utils/`**: Utility functions for response handling, error management, and common messages.
- **`middlewares/`**: Middleware functions for authentication and errorMiddleware.
- **`config/`**: Configuration files and environment variables.

api endpoints

1. Get Paginated Employees
Endpoint: GET /api/employees

Query Parameters:

page (optional): Page number (default: 1)
limit (optional): Number of records per page (default: 10)

example request:
GET http://localhost:3000/api/employees?page=1&limit=10

2. Get filtered Employees
Endpoint: GET /api/employees/filter

Query Parameters:
department: engineering, sales etc.

example request:
GET http://localhost:3000/api/employees/filter?department=Engineering

3. Get Sorted Employees (Using Joining Date):
Endpoint GET /api/employees/sort

Query Parameters:
order: asc or desc (optional by default desc is selected)
page: (by default 1)
limit: (optional by default 10 records)

example request:
http://localhost:3000/api/employees/sort?order=desc&page=1

4. Authentication:
Endpoint: POST /api/auth/login

body should be contains:
email:admin@gmail.com
password:admin@1

example request:
http://localhost:3000/api/auth/login

{
  "email":"admin@gmail.com",
  "password":"admin@1"
}


Installation
Clone the Repository

```bash
git clone https://github.com/Rushikesh-Gavali/employee-dashboard
```

Go to the folder
`cd backend`

Install Dependencies
`npm i`

To Run the code:
`node app.js`
