const express = require('express');
const inquirer = require('enquirer');

const mysql = require('mysql2');
const { ConnectionError } = require('./connection');

async function firstPrompt() {
const answers = await inquirer
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
switch (answers.next){
    case 'View All Employees':
        viewAllEmployees();
        break;
    case 'Add Employee':
        addEmployee();
        break;
    case 'Update Employee Role':
        updateEmployeeRole();
        break;
    case 'View All Roles':
        viewAllRoles();
        break;
    case 'Add Role':
        addRole();
        break;
    case 'View All Departments':
        viewAllDepartments();
        break;
    case 'Add Department':
        addDepartment();
        break;
    case 'Quit':
        exit();
        break;
    default: process.exit();
}
}
// [req.params.num - 1] grabs first number of an array. add array name beforehand

async function viewAllEmployees() {
    connect.query = ('SELECT employee.id, employee.first_name,employee.last_name, department.name, role.department_id, role.salary')
// push?
}

async function addEmployee() {
    connect.query = ('')
}

async function updateEmployeeRole() {
    connect.query = ('')
}

async function viewAllRoles() {
    connect.query = ('SELECT roles.id AS id,  dfggsdg')
}

async function addRole () {
    connect.query = ('')
}

async function viewAllDepartments() {
    connect.query = ('')
}

async function addDepartment() {
    connect.query = ('')
}

async function quit() {

}