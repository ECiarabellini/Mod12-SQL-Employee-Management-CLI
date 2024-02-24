const inquirer = require('inquirer');
const mysql = require('mysql');

// Connect to mysql database
const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'password!1',
        database: 'company_db'
    },
    console.log(`Connected to the company_db database.`)
);

const getDepartments = () => {
    const sql = `SELECT id AS department_id, department_name 
                 FROM departments`;
    db.query(sql, (err, results)=> {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        console.table(results);
        startMenu();
    });
    
}; 

const getRoles = () => {
    const sql = `SELECT 
                    r.job_title, 
                    r.id as role_ID, 
                    d.department_name, 
                    r.salary
                FROM roles r
                JOIN departments d ON d.id=r.department_id
                ORDER BY Role_ID`;
    db.query(sql, (err, results)=> {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        console.table(results);
        startMenu();
    });
}; 

const getEmployees = () => {
    const sql = `SELECT
                    e.ID as Employee_ID,
                    e.first_name,
                    e.last_name,
                    r.job_title,    
                    d.department_name,
                    r.salary,
                    m.first_name AS manager_first_name,
                    m.last_name AS manager_last_name
                FROM employees e
                LEFT JOIN employees m ON e.manager_id = m.id
                JOIN roles r ON r.id = e.employee_role
                JOIN departments d ON d.id = r.department_id
                ORDER BY e.ID
                `;
    db.query(sql, (err, results)=> {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        console.table(results);
        startMenu();
    });
}; 

const addDepartment = () => {
    inquirer
        .prompt([
        {
            type: "input",
            name: "addADepartment",
            message: "Enter a department name: ",
        },
        ])
        .then((inquirerResponse) => {
        let departmentName = inquirerResponse.addADepartment;
        const sql = `INSERT INTO departments (department_name) VALUES (?)`
        db.query(sql, [departmentName], (err, result) => {
            err
                ? console.log(err, "Missing required fields")
                : console.table(`Added department: ${departmentName}`),
                startMenu();
            }
        );
        });
};

const addRole = () => {
    //create a list of current department names to choose from
    let departmentNames = [];
    db.query(`SELECT *  FROM departments`, (err, result) => {
        if (err){ 
            throw err; 
        } else {
            result.forEach((line, index) => {
            departmentNames.push(
                {
                    name: line.department_name,
                    value: index+1
                }
            )
            });
        }
    });
    
    //ask the user for the new role details
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
            choices: departmentNames
        },        
        ])
        .then((data) => {
            const roleTitle = data.title;
            const roleSalary = data.salary;
            const roleDepartment = data.department;
            const sql = `INSERT INTO roles (job_title, salary, department_id) VALUES (?, ?, ?)`;
            const params = [roleTitle, roleSalary, roleDepartment];

            db.query(sql, params, (err, result) => {
                if (err) {
                    throw err;
                }
                console.log('Role added successfully!')
                startMenu();
                });
        });
};

const addEmployee = () => {
    //create a list of current roles to choose from
    let roleNames = [];
    db.query(`SELECT id, job_title FROM roles`, (err, result) => {
        if (err){ 
            throw err; 
        } else {
            result.forEach((line, index) => {
                roleNames.push(
                {
                    name: line.job_title,
                    value: index+1
                }
            )
            });
        }
    });

    //create a list of current employees to choose the manager from
    let managerNames = [];
    const sql = `SELECT id, 
                CONCAT(first_name, ' ' ,last_name) AS FirstLastName 
                FROM employees
                ORDER BY ID`;
    db.query(sql, (err, result) => {
        if (err){ 
            throw err; 
        } else {
            result.forEach((line, index) => {
                managerNames.push(
                {
                    name: line.FirstLastName,
                    value: index+1
                }
            )
            });
        }
    });
    
    //ask the user for the new employee details
    inquirer
        .prompt([
        {
            type: 'input',
            name: 'firstName',
            message: 'Enter employee first name: '
        },
        {
            type: 'input',
            name: 'lastName',
            message: 'Enter employee last name: '
        },
        {
            type: 'list',
            name: 'role',
            message: 'Select the role: ',
            choices: roleNames
        },
        {
            type: 'list',
            name: 'manager',
            message: 'Select the manager of the employee: ',
            choices: managerNames
        },              
        ])
        .then((data) => {
            const sql = `INSERT INTO employees (first_name, last_name, employee_role, manager_id) 
                        VALUES (?, ?, ?, ?)`;
            const params = [data.firstName, data.lastName, data.role, data.manager];

            db.query(sql, params, (err, result) => {
                if (err) {
                    throw err;
                }
                console.log('Employee added successfully!')
                startMenu();
                });
        });
};

const startMenu = () => {
    inquirer
    .prompt([
    {
        type: 'list',
        message: 'What would you like to do?',
        name: 'toDo',
        choices: ['view all departments', 'view all roles', 'view all employees', 
        'add a department', 'add a role', 'add an employee',  'update an employee role'],
    },
    ])
    .then((data) => {
        switch(data.toDo) {
            case 'view all departments': 
                getDepartments();
                break;
            case 'view all roles': 
                getRoles();
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
            case 'add an employee':
                addEmployee();
                break;
            case 'update an employee role':
                updateEmployeeRole();
                break;
        }
    });
}

startMenu();