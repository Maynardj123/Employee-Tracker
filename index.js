const express = require('express');
const inquirer = require('enquirer');

const mysql = require('mysql2');

inquirer
    .prompt( [
    {
        type: 'list',
        name: 'firstQuestion',
        message: 'What would you like to do?',
        choices: [
            'View All Employees',
            'Add Employee',
            'Update Employee Role',
            'View All Roles',
            'Add Role',
            'View All Departments',
            'Add Department',
            'Quit'
        ]

    }
])
.then()

const viewAllEmployees = () => {}

const addEmployee = () => {}

const updateEmployeeRole = () => {}

const viewAllRoles = () => {}

const addRole = () => {}

const viewAllDepartments = () => {}

const addDepartment = () => {}