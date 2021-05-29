const inquirer = require("inquirer");
const DB = require("./db/DB");

const init = async () => {
  const db = new DB("company_db");

  await db.start();

  let inProgress = true;

  while (inProgress) {
    const question = {
      type: "list",
      name: "action",
      message: "What would you like to do?",
      choices: [
        {
          short: "Employees",
          value: "viewAllEmployees",
          name: "View All Employees",
        },
        {
          short: "Employees By Department",
          value: "viewAllEmployeesByDepartment",
          name: "View All Employees By Department",
        },
        {
          short: "Employees By Role",
          value: "viewAllEmployeesByRole",
          name: "View All Employees By Role",
        },
        {
          short: "Add Employee",
          value: "addEmployee",
          name: "Add an Employee",
        },
        {
          short: "Remove Employee",
          value: "removeEmployee",
          name: "Remove an Employee",
        },
        {
          value: "updateEmployee",
          name: "Update an Employee",
        },
        {
          value: "updateEmployeeRole",
          name: "Update Employee Role",
        },
        {
          value: "updateEmployeeManager",
          name: "Update Employee Manager",
        },
        {
          short: "Roles",
          value: "viewAllRoles",
          name: "View All Roles",
        },
        {
          value: "addRole",
          name: "Add Role",
        },
        {
          value: "removeRole",
          name: "Remove Role",
        },
        {
          short: "Departments",
          value: "viewAllDepartments",
          name: "View All Departments",
        },
        {
          value: "addDepartment",
          name: "Add Departments",
        },
        {
          value: "removeDepartment",
          name: "Remove Departments",
        },
        {
          short: "Budget",
          value: "viewBudget",
          name: "View Utilised Budget for a Department",
        },
        {
          short: "Exit",
          value: "exit",
          name: "Exit",
        },
      ],
    };

    const answers = await inquirer.prompt(question);
    if (answers.action === "exit") {
      inProgress = false;
    } else {
      if (answers.action === "viewAllDepartments") {
        const query = "SELECT * FROM department";
        const data = await db.query(query);
        console.table(data);
      }

      if (answers.action === "viewAllRoles") {
        const query = "SELECT id, title FROM role";
        const data = await db.query(query);
        console.table(data);
      }

      if (answers.action === "viewAllEmployees") {
        const query = "SELECT id, first_name, last_name FROM employee";
        const data = await db.query(query);
        console.table(data);
      }

      if (answers.action === "removeEmployee") {
        const query = "SELECT * FROM employee";
        const data = await db.query(query);
        const choices = data.map((employee) => {
          return {
            value: employee.id,
            name: `${employee.first_name} ${employee.last_name}`,
          };
        });

        const deleteQuestion = {
          type: "list",
          name: "id",
          message: "which employee would you like to delete?",
          choices,
        };
        const { id } = await inquirer.prompt(deleteQuestion);

        const deleteQuery = `DELETE FROM employee WHERE id = ${id}`;
        await db.query(deleteQuery);
      }

      if (answers.action === "removeDepartment") {
        const query = "SELECT * FROM department";
        const data = await db.query(query);
        const choices = data.map((department) => {
          return {
            value: department.id,
            name: `${department.id} ${department.name}`,
          };
        });

        const deleteQuestion = {
          type: "list",
          name: "id",
          message: "which department would you like to delete?",
          choices,
        };
        const { id } = await inquirer.prompt(deleteQuestion);

        const deleteQuery = `DELETE FROM department WHERE id = ${id}`;
        await db.query(deleteQuery);
      }

      if (answers.action === "removeRole") {
        const query = "SELECT * FROM role";
        const data = await db.query(query);
        const choices = data.map((role) => {
          return {
            value: role.id,
            name: `${role.id} ${role.title}`,
          };
        });

        const deleteQuestion = {
          type: "list",
          name: "id",
          message: "which role would you like to delete?",
          choices,
        };
        const { id } = await inquirer.prompt(deleteQuestion);

        const deleteQuery = `DELETE FROM role WHERE id = ${id}`;
        await db.query(deleteQuery);
      }

      if (answers.action === "addDepartment") {
        const addQuestion = {
          type: "input",
          name: "add",
          message: "whats the name of the department you like to add?",
        };

        const { add } = await inquirer.prompt(addQuestion);

        const addQuery = `INSERT INTO department (name) VALUES ('${add}')`;
        await db.query(addQuery);
      }

      if (answers.action === "addEmployee") {
        const query = "SELECT * FROM role";
        const data = await db.query(query);
        const choices = data.map((role) => {
          return {
            value: role.id,
            name: `${role.id} ${role.title}`,
          };
        });

        const addQuestion = [
          {
            type: "input",
            name: "first",
            message: "whats the first name of the employee you like to add?",
          },
          {
            type: "input",
            name: "last",
            message: "whats the last name of the employee you like to add?",
          },
          {
            type: "list",
            name: "id",
            message: "whats the role of the employee?",
            choices,
          },
        ];

        const { first, last, id } = await inquirer.prompt(addQuestion);

        const addQuery = `INSERT INTO employee (first_name, last_name, role_id) VALUES ('${first}', '${last}', '${id}');
        `;
        await db.query(addQuery);
      }

      if (answers.action === "addRole") {
        const query = "SELECT * FROM department";
        const data = await db.query(query);
        const choices = data.map((department) => {
          return {
            value: department.id,
            name: `${department.id} ${department.name}`,
          };
        });

        const addQuestion = [
          {
            type: "input",
            name: "role",
            message: "whats the name of the role you like to add?",
          },
          {
            type: "input",
            name: "salary",
            message: "whats the salary of the role?",
          },
          {
            type: "list",
            name: "id",
            message: "whats the department of the role?",
            choices,
          },
        ];

        const { role, salary, id } = await inquirer.prompt(addQuestion);

        const addQuery = `INSERT INTO role (title, salary, department_id) VALUES ('${role}', '${salary}', '${id}');`;
        await db.query(addQuery);
      }

      if (answers.action === "updateEmployee") {
        const query = "SELECT id, first_name, last_name FROM employee";
        const data = await db.query(query);
        const choices = data.map((Employees) => {
          return {
            value: Employees.id,
            name: `${Employees.id} ${Employees.first_name} ${Employees.last_name}`,
          };
        });

        const updateQuestion = [
          {
            type: "list",
            name: "id",
            message: "which employee would you like to update?",
            choices,
          },
          {
            type: "input",
            name: "firstName",
            message: "what would you like to update the first name too?",
          },
          {
            type: "input",
            name: "lastName",
            message: "what would you like to update the last name too?",
          },
        ];

        const { firstName, lastName, id } = await inquirer.prompt(
          updateQuestion
        );

        const addQuery = `UPDATE employee SET first_name = '${firstName}', last_name = '${lastName}' WHERE id = '${id}'`;
        await db.query(addQuery);
      }

      if (answers.action === "updateEmployeeRole") {
        const query = "SELECT id, first_name, last_name FROM employee";
        const data = await db.query(query);

        const choices = data.map((Employees) => {
          return {
            value: Employees.id,
            name: `${Employees.id} ${Employees.first_name} ${Employees.last_name}`,
          };
        });

        const query2 = "SELECT id, title FROM role";
        const data2 = await db.query(query2);

        const choices2 = data2.map((Roles) => {
          return {
            value: Roles.id,
            name: `${Roles.id} ${Roles.title}`,
          };
        });

        const updateQuestion = [
          {
            type: "list",
            name: "id",
            message: "which employee would you like to update?",
            choices,
          },
          {
            type: "list",
            name: "role",
            message: "what role would you like to add?",
            choices: choices2,
          },
        ];

        const { role, id } = await inquirer.prompt(updateQuestion);

        const addQuery = `UPDATE employee SET role_id = '${role}'  WHERE id = '${id}'`;
        await db.query(addQuery);
      }

      if (answers.action === "updateEmployeeManager") {
        const query = "SELECT id, first_name, last_name FROM employee";
        const data = await db.query(query);
        const choices = data.map((Employees) => {
          return {
            value: Employees.id,
            name: `${Employees.id} ${Employees.first_name} ${Employees.last_name}`,
          };
        });

        const updateQuestion = [
          {
            type: "list",
            name: "id",
            message: "which employee would you like to update there manager?",
            choices,
          },
          {
            type: "list",
            name: "role_id",
            message: "who is there manager?",
            choices,
          },
        ];

        const { role_id, id } = await inquirer.prompt(updateQuestion);

        const addQuery = `UPDATE employee SET manager_id = '${role_id}' WHERE id = '${id}'`;
        await db.query(addQuery);
      }

      if (answers.action === "viewAllEmployeesByDepartment") {
        const query = "SELECT * FROM department";
        const data = await db.query(query);
        const choices = data.map((department) => {
          return {
            value: department.id,
            name: `${department.id} ${department.name}`,
          };
        });

        const viewQuestion = [
          {
            type: "list",
            name: "id",
            message: "which department would you like to see?",
            choices,
          },
        ];

        const { id } = await inquirer.prompt(viewQuestion);

        const addQuery = `SELECT id, first_name, last_name FROM employee where role_id = '${id}'`;
        const data2 = await db.query(addQuery);
        console.table(data2);
      }

      if (answers.action === "viewAllEmployeesByRole") {
        const query = "SELECT * FROM role";
        const data = await db.query(query);
        const choices = data.map((role) => {
          return {
            value: role.id,
            name: `${role.id} ${role.title}`,
          };
        });

        const viewQuestion = [
          {
            type: "list",
            name: "id",
            message: "which role would you like to the employees for?",
            choices,
          },
        ];

        const { id } = await inquirer.prompt(viewQuestion);

        const addQuery = `SELECT id, first_name, last_name FROM employee where role_id = '${id}'`;
        const data2 = await db.query(addQuery);
        console.table(data2);
      }
    }
  }
};

init();
