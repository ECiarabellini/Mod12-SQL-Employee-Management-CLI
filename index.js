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

const getDepartments = () => {
    const sql = `SELECT id AS department_id, department_name AS department_name 
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

const startMenu = () => {
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
}

startMenu();