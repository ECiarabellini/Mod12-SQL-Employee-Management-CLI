//import and require express and mySQL
const express = require('express');
const mysql = require('mysql');

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    // MySQL username,
    user: 'root',
    // MySQL password
    password: 'password!1',
    database: 'company_db'
  },
  console.log(`Connected to the company_db database.`)
);

// View all departments
app.get('/api/departments', (req, res) => {
    const sql = `SELECT * FROM departments`;
    db.query(sql, (err, rows)=> {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({
            message: 'success',
            data: rows
        });
    });
});

// View all roles
app.get('/api/roles', (req, res) => {
    const sql = `SELECT 
                    r.job_title, 
                    r.id as Role_ID, 
                    d.department_name, 
                    r.salary
                FROM roles r
                JOIN departments d ON d.id=r.department_id
                ORDER BY Role_ID`;
    db.query(sql, (err, rows)=> {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({
            message: 'success',
            data: rows
        });
    });
});

// View all employees
app.get('/api/employees', (req, res) => {
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
    db.query(sql, (err, rows)=> {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({
            message: 'success',
            data: rows
        });
    });
});


// Add a department
app.post('/api/new-department', ({ body }, res) => {
    const sql = `INSERT INTO departments (department_name) VALUES (?)`;
    const params = [body.department_name];
    if (!department_name) {
        res.status(400).json({ error: "Missing required fields" });
        return;
    }

    db.query(sql, params, (err, result) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({
            message: 'success',
            data: body
        });
    });
});

// Add a role
app.post('/api/new-role', ({ body }, res) => {
    const { job_title, salary, department_id } = body;
    if (!job_title || !salary || !department_id) {
        res.status(400).json({ error: "Missing required fields" });
        return;
    }

    const sql = `INSERT INTO roles (job_title, salary, department_id) VALUES (?, ?, ?)`;
    const params = [job_title, salary, department_id];

    db.query(sql, params, (err, result) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }

        res.json({
            message: 'success',
            data: {
                id: result.insertId,
                job_title: job_title,
                salary: salary,
                department_id: department_id
            }
        });
    });
});

// Add a employee
app.post('/api/new-employee', ({ body }, res) => {
    const { first_name, last_name, employee_role, manager_id } = body;
    if (!first_name || !last_name || !employee_role) {
        res.status(400).json({ error: "Missing required fields" });
        return;
    }

    const sql = `INSERT INTO employees (first_name, last_name, employee_role, manager_id) 
                VALUES (?, ?, ?, ?)`;
    const params = [first_name, last_name, employee_role, manager_id];

    db.query(sql, params, (err, result) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }

        res.json({
            message: 'success',
            data: {
                id: result.insertId,
                first_name: first_name,
                last_name: last_name,
                employee_role: employee_role,
                manager_id:  manager_id
            }
        });
    });
});

// Update employee role
app.post('/api/update-employee-role', ({ body }, res) => {
    const { id, employee_role } = body;
    if (!id || !employee_role) {
        res.status(400).json({ error: "Missing required fields" });
        return;
    }

    const sql = `UPDATE employees
                SET employee_role = ?
                WHERE id = ?;
                `;
    const params = [employee_role, id];

    db.query(sql, params, (err, result) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }

        res.json({
            message: 'success',
            data: {
                id: id,
                employee_role: employee_role,
            }
        });
    });
});


// // Delete a movie
// app.delete('/api/movie/:id', (req, res) => {
//   const sql = `DELETE FROM movies WHERE id = ?`;
//   const params = [req.params.id];
  
//   db.query(sql, params, (err, result) => {
//     if (err) {
//       res.statusMessage(400).json({ error: res.message });
//     } else if (!result.affectedRows) {
//       res.json({
//       message: 'Movie not found'
//       });
//     } else {
//       res.json({
//         message: 'deleted',
//         changes: result.affectedRows,
//         id: req.params.id
//       });
//     }
//   });
// });

// // BONUS: Update review name
// app.put('/api/review/:id', (req, res) => {
//   const sql = `UPDATE reviews SET review = ? WHERE id = ?`;
//   const params = [req.body.review, req.params.id];

//   db.query(sql, params, (err, result) => {
//     if (err) {
//       res.status(400).json({ error: err.message });
//     } else if (!result.affectedRows) {
//       res.json({
//         message: 'Movie not found'
//       });
//     } else {
//       res.json({
//         message: 'success',
//         data: req.body,
//         changes: result.affectedRows
//       });
//     }
//   });
// });

// Default response for any other request (Not Found)
app.use((req, res) => {
  res.status(404).end();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
