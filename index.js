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
            quit();
            break;
        default: 
        console.log("None matched")
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
    // query into the role table to get all the roles
    connect.query('SELECT * FROM department',(err, result3) => {
        
        if (err) {
             throw err
        }
         console.table(result3)
        //  loops through the array and returns the roles
        let departments = result3.map(department => {var departmentChoice = {value: department.id, name: department.name}; return departmentChoice; }) 
        console.log(departments)
// select all from employee table
// connect.query('SELECT role.title, role.salary FROM role ',(err, result4) => {
        
//     if (err) {
//          throw err
//     }
//      console.log(result4)
//     //  loops through the array and returns the employees
//     let rolesAdd = result4.map(role => role.title+'. '+role.salary) 
//     console.log(rolesAdd)
// asks questions to add the information of the new employee
        inquirer.prompt ([
            {
                type: 'input',
                name: 'roleName',
                message: 'What is the name of the role?',
            },
            {
                type: 'input',
                name: 'roleSalary',
                message: 'What is the salary of the role?',  
            },
            {
                type: 'list',
                name: 'departmentRole',
                message: 'Which department does the role belong to?',
                choices: departments,
            },
        ]).then((answer) =>{
            // split it so you can extract the id number before the period
            // let roleTitle = answer.role.split('.')[0]
            
            connect.query ('INSERT INTO role(title, salary, department_id) VALUES (?, ?, ?) ', [answer.roleName ,answer.roleSalary, answer.departmentRole], (err, result) => {
                
                
                for (let i=0; i < result3.length; i++){
                    if (result3[i].department_name === answer.departmentRole) {
                        department.id = result3[i].id
                    }
                }
                if (err) {
                     throw err
                }
                console.table(result)
                firstPrompt();
            })
        })
    }) 
}
// ) }

function viewAllDepartments() {
    console.log("view all departments")
    connect.query ('SELECT * FROM department', (err, result) => {
        if (err) {
            throw err
        }
        console.table(result)
        firstPrompt();
    })
}

async function addDepartment() {
    console.log("add department")
    
        inquirer.prompt ([
            {
                type: 'input',
                name: 'departmentName',
                message: 'What is the name of the department?',
            },
        ]).then((answer) =>{
            connect.query(' INSERT INTO department (name) VALUES (?);', answer.departmentName,(err, result2) => {
                if (err) {
                     throw err
                    
                }
                console.log('ahhhhhhhhhhhh')
                viewAllDepartments()
            })
               
        })
        
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