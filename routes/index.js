const { express } = require('express');
const inquirer = require('inquirer');
const db = require('../db/connection');
const cTable = require('console.table');

let departments = [];
let roles = [];
let employees = [];
let updatedRole = [];

console.log("------------------Employee Tracker---------------------");
// function that starts the questions
async function startQuestions() {
    const question = await inquirer.prompt([
        {
            type: 'list',
            name: 'trackerAction',
            message: "What would you like to do?",
            choices: ['View all departments', 'View all roles', 'View all employees', 'Add a role', 'Add an employee', 'Add a department', 'Update employee role', 'Quit']
        }
    ])
    
    // Allows user to view all departments 
    if (question.trackerAction === 'View all departments') {
        viewDepartments();
       

    }



    // Allows user to view all roles 
    if (question.trackerAction === "View all roles") {
        viewRoles();
        
    }


    // Allows user to view all employees
    if (question.trackerAction === "View all employees") {
        viewEmployees();
       
    }
    // Allows user to add a role 
    let newRole
    if (question.trackerAction === "Add a role") {
        newRole = await inquirer.prompt([
            {
                type: 'input',
                name: 'newRoleTitle',
                message: "What is the title of the new role? (Required)",
                validate: newRoleTitle => {
                    if (newRoleTitle) {
                        return true;
                    } else {
                        console.log("Please enter a role title")
                    }
                }
            },
            {
                type: 'input',
                name: 'newRoleSalary',
                message: "What is the new role's salary? (Required)",
                validate: newRoleSalary => {
                    if (newRoleSalary) {
                        return true;
                    } else {
                        console.log("Please enter the role's salary")
                    }
                }
            },
            {
                type: 'list',
                name: 'departmentID',
                message: "What department does the new role belong to?",
                choices: ['1', '2', '3', '4']
            }

        ])
        // if a new role is added push to array so that it can be added in addRole() function 
        if (newRole) {

            roles.push(newRole)
            
        }

        addRole();
        
    }
    
    // Allow user to add an employee 
    if (question.trackerAction === "Add an employee") {
        
        newEmployee = await inquirer.prompt([
            {
                type: 'input',
                name: 'newEmployeeFirstName',
                message: "What is the employee's first name? (Required)",
                validate: newEmployeeFirstName => {
                    if (newEmployeeFirstName) {
                        return true;
                    } else {
                        console.log("Please enter the employee's first name!")
                    }
                }
            },
            {
                type: 'input',
                name: 'newEmployeeLastName',
                message: "What is the employee's last name? (Required)",
                validate: newEmployeeLastName => {
                    if (newEmployeeLastName) {
                        return true;
                    } else {
                        console.log("Please enter the employee's last name!")
                    }
                }
            },
            {
                type: 'input',
                name: 'roleID',
                message: "What is the employee's role id? (Required)",
                validate: roleID => {
                    if (roleID) {
                        return true;
                    } else {
                        console.log("Please enter the role ID!")
                    }
                }
            },
            {
                type: 'input',
                name: 'managerName',
                message: "What is the Manager's name? (Required)",
                validate: managerName => {
                    if (managerName) {
                        return true;
                    } else {
                        console.log("Please enter the manager's name!")
                    }
                }
            },
            {
                type: 'input',
                name: 'departmentID',
                message: "What is the employee's department id? (Required)",
                validate: departmentID => {
                    if (departmentID) {
                        return true;
                    } else {
                        console.log("Please enter the department ID!")
                    }
                }
            }

        ])
        if (newEmployee) {

            employees.push(newEmployee);
            
        }

        addEmployee();
       
    }
       
        // Allow user to add a department 
        if (question.trackerAction === 'Add a department') {
            newDepartment = await inquirer.prompt([
                {
                    type: 'input',
                    name: 'newDepartment',
                    message: "What is the new Department name? (Required)",
                    validate: newDepartment => {
                        if (newDepartment) {
                            return true;
                        } else {
                            console.log("Please enter a department name!")
                        }
                    }
                }
            ])
            if (newDepartment) {
    
                departments.push(newDepartment);
                
            }
            addDepartment();
           
        }
      // Allows user to update an employee role
      if (question.trackerAction === "Update employee role") {
        
        updatedEmployeeRole = await inquirer.prompt([ 
            {
                type: 'input',
                name: 'employeeFirstName',
                message: "What is the first name of the employee you would like to update? (Required)",
                validate: employeeFirstName => {
                    if (employeeFirstName) {
                        return true;
                    } else {
                        console.log("Please enter your employee's first name!")
                    }
                }
            },
            {
                type: 'input',
                name: 'employeeLastName',
                message: "What is the last name of the employee you would like to update? (Required)",
                validate: employeeLastName => {
                    if (employeeLastName) {
                        return true;
                    } else {
                        console.log("Please enter your employee's last name!")
                    }
                }
            },
            {
                type: 'input',
                name: 'newRoleID',
                message: "What is the new role id you would like to assign the employee? (Required)",
                validate: newRoleID => {
                    if (newRoleID) {
                        return true;
                    } else {
                        console.log("Please enter the new role ID!")
                    }
                }
            }
        ])

        if (updatedEmployeeRole) {
            updatedRole.push(updatedEmployeeRole);
            
        }
        
        updateEmployeeRole();
       
    }

    // this will allow the user to quit
    if (question.trackerAction === 'Quit') {
        console.log("Have a nice day! Press control c to exit ");
        return;
    }
    startQuestions();
};


// function to view the departments
const viewDepartments = () => {
    departments = [];

    db.query(`SELECT * FROM department`, (err, row) => {
        if (err) {
            console.log(err);
            return;
        }
        for (let i = 0; i < row.length; i++){
            departments.push(row[i]);
        }
        console.table('', departments);
        console.log('Arrow down to perfrom another action');
    })
};

// function to view roles 

const viewRoles = () => {

    roles = [];

    db.query(`SELECT * FROM employeerole`, (err, row) => {
        if (err) {
            console.log(err);
            return;
        }
        for (let j = 0; j < row.length; j++) {
            roles.push(row[j]);
        }
        console.table('', roles);
        console.log('Arrow down to perform another action');
    })

};
