USE employees_db;

INSERT INTO departments (name)
VALUES ("Instructor"),
       ("Teaching Assistant"),
       ("Student"),
       ("Student Support");

INSERT INTO roles (title, salary, department_id)
VALUES ("Main Instructor", 1000000.00, 1),
       ("TA", 80000.00, 2),
       ("Student", -14000.00, 3),
       ("Student Relations", 150000.00, 4);

INSERT INTO employees (first_name, last_name, role_id)
VALUES ("Leah", "Nelson", 1),
       ("Christian", "Henry", 2),
       ("Megan", "Henning", 2),
       ("Ronald", "Sit", 3),
       ("Emilio", "Estevez", 3),
       ("Damien", "Luzzo", 3),
       ("Ismeny", "Saguilan", 3),
       ("Carlos", "Hernandez", 3),
       ("Sean", "Flemming", 4);

UPDATE employees
SET manager_id = 1
WHERE id IN (2,3);