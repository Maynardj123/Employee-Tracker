const inquirer = require('inquirer');
const cTable = require('console.table');

const connect = require('./connection');


async function firstPrompt() {
    const answers = await inquirer
        .prompt([
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
    switch (answers.firstQuestion) {
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
        default: 
        console.log("None matchded")
        //process.exit();
    }
}
// [req.params.num - 1] grabs first number of an array. add array name beforehand

async function viewAllEmployees() {
    console.log("View all employees")
    connect.query('SELECT employee.id, employee.first_name, employee.last_name, department.name, role.department_id, role.salary FROM employee JOIN role ON employee.role_id = role.id JOIN department ON role.department_id = department.id ', (err, result) => {
        if (err) {
            throw err
          //  res.status(500).json({ error: err.message });
           // return;
        }
        console.table(result)
        firstPrompt();
    });
    // push?
}

async function addEmployee() {
    console.log("add employee");
    // query into the role table to get all the roles
    connect.query('SELECT * FROM role',(err, result) => {
        
        if (err) {
             throw err
        }
         console.table(result)
        //  loops through the array and returns the roles
        let roles = result.map(role => role.id+'. '+role.title) 
        console.log(roles)
// select all from employee table
connect.query('SELECT * FROM employee ',(err, result2) => {
        
    if (err) {
         throw err
    }
     console.table(result2)
    //  loops through the array and returns the employees
    let employees = result2.map(employee => employee.id+'. '+employee.first_name+' '+employee.last_name) 
    console.log(employees)
// asks questions to add the information of the new employee
        inquirer.prompt ([
            {
                type: 'input',
                name: 'firstName',
                message: 'What is the first name?',
            },
            {
                type: 'input',
                name: 'lastName',
                message: 'What is the last name?',  
            },
            {
                type: 'list',
                name: 'role',
                message: 'What is the role?',
                choices: roles,
            },
            {
                type: 'list',
                name: 'manager',
                message: 'What is the manager id?',
                choices: employees,
            },
        ]).then((answer) =>{
            // split it so you can extract the id number before the period
            let roleId = answer.role.split('.')[0]
            let managerId = answer.manager.split('.')[0]
            connect.query ('INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?) ', [answer.firstName ,answer.lastName,roleId, managerId], (err, result) => {
            
                if (err) {
                     throw err
                 }
                 console.table(result)
                 firstPrompt();
             })
        })
    }) 
}) 
    
   
}

async function updateEmployeeRole() {
    console.log("update employee role");
    connect.query = ('')
        if (err) {
            throw err
        }
        console.table(result)
        firstPrompt();
}

async function viewAllRoles() {
    console.log("view all roles");
    connect.query('SELECT role.id, role.title, department.name, role.salary FROM role JOIN department ON role.department_id = department.id', (err, result) => {
        if (err) {
            throw err
        }
        console.table(result)
        firstPrompt();
    });
}

async function addRole() {
    console.log("add role");
    connect.query = ('')
        if (err) {
            throw err
        }
        console.table(result)
        firstPrompt();
}

async function viewAllDepartments() {
    console.log("view all departments")
    connect.query = ('SELECT ')
        if (err) {
            throw err
        }
        console.table(result)
        firstPrompt();
}

async function addDepartment() {
    console.log("add department")
    connect.query = ('')
        if (err) {
            throw err
        }
        console.table(result)
        firstPrompt();
}

async function quit() {
    console.log("quit")
        if (err) {
            throw err
        }
        console.table(result)
        firstPrompt();

}

firstPrompt()