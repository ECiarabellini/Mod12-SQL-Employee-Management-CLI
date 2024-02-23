const inquirer = require('inquirer');

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
    .then(data => {
        // Handle the response data here
        console.table(data);
    })
    .catch(error => {
        console.error('Error fetching departments:', error.message);
        console.log(error);
    });

const getRoles = () =>
    fetch('http://localhost:3001/api/roles', {
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
    .then(data => {
        // Handle the response data here
        console.table(data);
    })
    .catch(error => {
        console.error('Error fetching roles:', error.message);
        console.log(error);
    });

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

// const addRole = () => 
//     inquirer
//         .prompt([
//         {
//             type: 'input',
//             name: 'title',
//             message: 'Enter the job title: '
//         },
//         {
//             type: 'input',
//             name: 'salary',
//             message: 'Enter the salary: '
//         },
//         {
//             type: 'list',
//             name: 'department',
//             message: 'Select the department: ',
//             choices: [departmentChoices]
//         },        
//         ])
//         .then((data) => {
//             const newDeptName = data.addDept;
//             fetch('http://localhost:3001/api/new-department', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json'
//                 },
//                 body: JSON.stringify({ department_name: newDeptName })
//             })
//             .then(response => {
//                 if (!response.ok) {
//                     throw new Error('Failed to create department');
//                 }
//                 return response.json();
//             })
//             .then(data => {
//                 console.log('Department created successfully:', newDeptName);
//             })
//             .catch(error => {
//                 console.error('Error creating department:', error.message);
//             });
//         });



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
                getRoles();
                break;
            case 'view all employees':
                getEmployees();
                break;
            case 'add a department':
                addDepartment();
                break;
        }
    });