const inquirer = require('inquirer');
// const {Triangle, Circle, Square} = require('./lib/shapes.js');

inquirer
    .prompt([
    // {
    //     type: 'input',
    //     name: 'backgroundColor',
    //     message: 'What background color do you want the logo to have?',
    // },
    {
        type: 'list',
        message: 'What would you like to do? (Use arrow keys)',
        name: 'toDo',
        choices: ['view all departments', 'view all roles', 'view all employees', 
        'add a department', 'add a role', 'add an employee',  'update an employee role'],
    },
    ])
    .then((data) => {
        console.log(data.toDo);
        //when view all employees, will need to present a table that uses a join in order to display job title, dept name, etc.
        //   ...THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
    });
