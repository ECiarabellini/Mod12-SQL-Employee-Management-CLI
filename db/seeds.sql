INSERT INTO departments (department_name)
VALUES ("Accounting"),
       ("Marketing"),
       ("Sales"),
       ("Product"),
       ("Engineering"),
       ("Executive");

INSERT INTO roles (job_title, salary, department_id)
VALUES ("Staff Accountant", 90000, 1),
        ("Tax Consultant", 90000, 1),
        ("Director, Accounting", 135000, 1),
        ("Marketing Manager", 95000, 2),
        ("Brand Manager", 87000, 2),
        ("Account Executive", 110000, 3),
        ("Business Development Manager", 140000, 3),
        ("Product Analyst", 95000, 4),
        ("Product Designer", 100000, 4),
        ("Director, Product Management", 130000, 4),
        ("Staff Software Engineer", 110000, 5),
        ("Test Software Engineer", 110000, 5),
        ("Engineering Manager", 130000, 5),
        ("Chief Executive Officer", 300000, 6);

INSERT INTO employees (first_name, last_name, employee_role, manager_id)
VALUES ('Rachel', 'Carlson', 14, null),
    ('Michael', 'Johnson', 3, 1),    
    ('John', 'Doe', 1, 2),
    ('Jane', 'Smith', 2, 2),
    ('Emily', 'Williams', 4, 1),
    ('Christopher', 'Brown', 5, 5),
    ('Daniel', 'Garcia', 7, 1),
    ('Amanda', 'Jones', 6, 7),
    ('Jennifer', 'Young', 10, 1),
    ('Sarah', 'Martinez', 8, 9),
    ('David', 'Hernandez', 9, 9),
    ('Cara', 'Walker', 13, 1),
    ('Matthew', 'King', 11, 12),
    ('Laura', 'Lee', 12, 12),
    ('Olivia', 'Perez', 11, 12),
    ('William', 'Scott', 11, 12),
    ('Jessica', 'Green', 11, 16),
    ('Ryan', 'Adams', 11, 16);

SELECT
    e.*,
    r.salary,
    r.job_title,
    d.department_name,
    m.first_name AS manager_first_name,
    m.last_name AS manager_last_name,
    rm.job_title AS manager_title,
    dm.department_name AS manager_department
FROM employees e
LEFT JOIN employees m ON e.manager_id = m.id
JOIN roles r ON r.id = e.employee_role
JOIN departments d ON d.id = r.department_id
JOIN roles rm ON rm.id = m.employee_role
JOIN departments dm ON dm.id = rm.department_id
