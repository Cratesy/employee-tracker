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
    }
  }
};

init();
