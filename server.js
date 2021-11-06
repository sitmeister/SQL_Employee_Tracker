const mysql = require("mysql2");
const PORT = process.env.PORT || 3001;
const inquirer = require("inquirer");
require("console.table");
// Connect to database
const connection = mysql.createConnection(
  {
    host: "localhost",
    // MySQL Username
    user: "root",
    // TODO: Add MySQL Password
    password: "password",
    database: "employees_db",
  },
  console.log(`Connected to the employees database.`)
);

function start() {

  inquirer
    .prompt({
      type: "list",
      message: "What do you want to do?",
      name: "option",
      choices: ["Add", "View", "Remove", "Quit"],
    })
    .then(function (answer) {
      if (answer.option === "Add") {
        inquirer
          .prompt({
            type: "list",
            message: "What do you want to add?",
            name: "option",
            choices: ["departments", "roles", "employees"],
          })
          .then(function (answer) {
            // Adding department option
            if (answer.option === "departments") {
              inquirer
                .prompt({
                  type: "input",
                  message:"What is the name of the department you want to add?",
                  name: "option",
                })
                .then(function (answer) {
                  connection.connect();

                  connection.query(
                    "INSERT INTO departments SET ?",
                    { name: answer.option },
                    function (error) {
                      if (error) throw error;

                      console.log("Department added!");
                      
                      start();
                      
                    }
                  );
                });
            } else if (answer.option === "roles") {
              inquirer
                .prompt([
                  {
                    type: "input",
                    message: "What is the title of the role you want to add?",
                    name: "option",
                  },
                  {
                    type: "input",
                    message: "What is the salary for this position?",
                    name: "amount",
                  },
                  {
                    type: "input",
                    message: "What department ID does this role work in?",
                    name: "departmentId",
                  },
                ])
                .then(function (answer) {
                  connection.connect();

                  connection.query(
                    "INSERT INTO roles SET ?",
                    {
                      title: answer.option,
                      salary: answer.amount,
                      department_id: answer.departmentId,
                    },
                    function (error, results) {
                      if (error) throw error;

                      console.log("Role added!");
                      start();
                    }
                  );
                });
            }
            // adding employee
            else {
              inquirer
                .prompt([
                  {
                    type: "input",
                    message:
                      "What is the first name of the employee you want to add?",
                    name: "first",
                  },
                  {
                    type: "input",
                    message:
                      "What is the last name of the employee you want to add?",
                    name: "last",
                  },
                  {
                    type: "input",
                    message: "What role does this employee have? (please enter role ID #)",
                    name: "role",
                  },
                ])
                .then(function (answer) {
                  connection.connect();

                  connection.query(
                    "INSERT INTO employees SET ?",
                    {
                      first_name: answer.first,
                      last_name: answer.last,
                      role_id: answer.role,
                    },
                    function (error, results, fields) {
                      if (error) throw error;

                      console.log("Employee added!");
                      start();
                    }
                  );
                });
            }
          });
      }
      // View option
      else if (answer.option === "View") {
        inquirer
          .prompt({
            type: "list",
            message: "What do you want to view?",
            name: "option",
            choices: ["departments", "roles", "employees"],
          })
          .then(function (answer) {
            // viewing department option
            if (answer.option === "departments") {
              connection.connect();

              connection.query(
                "SELECT * FROM departments",
                { name: answer.option },
                function (error, results) {
                  if (error) throw error;

                  console.table("Departments", results);
                  start();
                }
              );
            } else if (answer.option === "roles") {
              connection.connect();

              connection.query(
                "SELECT * FROM roles",
                { name: answer.option },
                function (error, results) {
                  if (error) throw error;

                  console.table("Roles", results);
                  start();
                }
              );
            }
            // viewing employee
            else {
              connection.connect();

              connection.query(
                "SELECT * FROM employees",
                { name: answer.option },
                function (error, results) {
                  if (error) throw error;

                  console.table("Employees", results);
                  start();
                }
              );
            }
          });
      } else if (answer.option === "Remove") {
        inquirer
          .prompt({
            type: "list",
            message: "Where do you want to remove from?",
            name: "option",
            choices: ["department", "role", "employee"],
          })
          .then(function (answer) {
            // beginning of remove department
            if (answer.option === "department") {
              inquirer
                .prompt({
                  type: "input",
                  message:
                    "What is the name of the department you want to remove?",
                  name: "option",
                })
                .then(function (answer) {
                  connection.connect();

                  connection.query(
                    "DELETE FROM departments WHERE ?",
                    { name: answer.option },
                    function (error, results) {
                      if (error) throw error;
                      console.log("Department removed!");
                      start();
                    }
                  );
                });
            }
            // beginning of remove role
            else if (answer.option === "role") {
              inquirer
                .prompt({
                  type: "input",
                  message: "What is the title of the role you want to remove?",
                  name: "option",
                })
                .then(function (answer) {
                  connection.connect();

                  connection.query(
                    "DELETE FROM roles WHERE ?",
                    { title: answer.option },
                    function (error, results) {
                      if (error) throw error;
                      console.log("Role removed!");
                      start();
                    }
                  );
                });
            }
            // beginning of remove employee
            else if (answer.option === "employee") {
              inquirer
                .prompt({
                  type: "input",
                  message: "What is the id of the employee you want to remove?",
                  name: "option",
                })
                .then(function (answer) {
                  connection.connect();

                  connection.query(
                    "DELETE FROM employees WHERE ?",
                    { id: answer.option },
                    function (error, results) {
                      if (error) throw error;
                      console.log("Employee removed!");
                      start();
                    }
                  );
                });
            }
          });
      } else {
        process.exit();
      }
    });
}
start();
