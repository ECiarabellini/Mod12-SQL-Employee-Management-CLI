const inquirer = require('inquirer');
const mysql = require('mysql');

// Connect to database
const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'password!1',
        database: 'company_db'
    },
    console.log(`Connected to the company_db database.`)
);


const getDepartments = () =>
    fetch('http://localhost:3001/api/departments', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to fetch departments');
        }
        return response.json();
    })
    .then(data => {        // Handle the response data 
        console.table(data);
        // Extract department names from the response
    })
    .then(data => {
        departmentNames = data.map(department => department.department_name);
        console.log('data', data);
        return departmentNames;
    }) 
    .catch(error => {
        console.error('Error fetching departments:', error.message);
        console.log(error);
    });

const getRoles = () => {
    return fetch('http://localhost:3001/api/roles', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to fetch roles');
        }
        return response.json();
    })
    .then(data => {
        console.log('Roles:', data);
        return data; // returning the data fetched
    })
    .catch(error => {
        console.error('Error fetching roles:', error.message);
        throw error; // rethrowing the error for the caller to handle
    });
};

const displayRoles = async (roles) => {
    let rolesList = await roles.json();
    console.table(rolesList);
}

const getEmployees = () =>
    fetch('http://localhost:3001/api/employees', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to fetch employees');
        }
        return response.json();
    })
    .then(data => {
        // Handle the response data here
        console.table(data);
    })
    .catch(error => {
        console.error('Error fetching employees:', error.message);
        console.log(error);
    });

const addDepartment = () => 
inquirer
    .prompt([
    {
        type: 'input',
        name: 'addDept',
        message: 'Enter in a department name: '
    }
    ])
    .then((data) => {
        const newDeptName = data.addDept;
        fetch('http://localhost:3001/api/new-department', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ department_name: newDeptName })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to create department');
            }
            return response.json();
        })
        .then(data => {
            console.log('Department created successfully:', newDeptName);
        })
        .catch(error => {
            console.error('Error creating department:', error.message);
        });
    });

const addRole = () => {
    const departmentOptions = getDepartments();
    console.log('departmentOptions 107', departmentOptions);
    inquirer
        .prompt([
        {
            type: 'input',
            name: 'title',
            message: 'Enter the job title: '
        },
        {
            type: 'input',
            name: 'salary',
            message: 'Enter the salary: '
        },
        {
            type: 'list',
            name: 'department',
            message: 'Select the department: ',
            choices: [departmentOptions]
        },        
        ])
        .then((data) => {
            const roleTitle = data.title;
            const roleSalary = data.salary;
            const roleDepartment = data.department;
            fetch('http://localhost:3001/api/new-role', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ 
                    job_title: roleTitle, 
                    salary: roleSalary,
                    department_id: roleDepartment }) ///need to work this out. API expecting ID
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to create new role');
                }
                return response.json();
            })
            .then(data => {
                console.log('Role created successfully:', roleTitle);
            })
            .catch(error => {
                console.error('Error creating role:', error.message);
            });
        });
    }

inquirer
    .prompt([
    {
        type: 'list',
        message: 'What would you like to do? (Use arrow keys)',
        name: 'toDo',
        choices: ['view all departments', 'view all roles', 'view all employees', 
        'add a department', 'add a role', 'add an employee',  'update an employee role'],
    },
    ])
    .then((data) => {
        switch(data.toDo) {
            case 'view all departments': 
                getDepartments();
                console.log('departmentNames', departmentNames);
                break;
            case 'view all roles': 
                displayRoles();
                break;
            case 'view all employees':
                getEmployees();
                break;
            case 'add a department':
                addDepartment();
                break;
            case 'add a role':
                addRole();
                break;
        }
    });

