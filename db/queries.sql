-- ALL DEPARTMENTS
SELECT * FROM departments;

-- ALL ROLES
SELECT r.id, title, salary, d.dept_name AS department
FROM roles role_id
JOIN departments d
    on r.department_id = d.id;

-- ALL EMPLOYEES
SELECT employee.id, first_name, 
FROM employees