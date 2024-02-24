# Mod12-SQL-Employee-Management-CLI

## Description
MSU Coding Bootcamp Module 12 Challenge Employee Tracker

The purpose of this project was to build a command-line application to manage a company's employee database, using Node.js, Inquirer, and MySQL.

Future enhancements may include: 
- add express server for potential web application (see './discarded_files' for work done previously)
- Use separate file that contains functions for performing the SQL queries, using a constructor function or class for organizing. 
- Add user input validation


## Installation
- Repo: [GitHub Repo](https://github.com/ECiarabellini/Mod12-SQL-Employee-Management-CLI)
- Video walkthrough: [GoogleDrive link](---)


## Usage
To run: 
 - Run 'npm install' from the command line
 - Open mysql. Type source db/schema.sql, then source db/seeds.sql to create and seed the database.
 - Run 'node index' to begin application interface 
 - Arrow up and down to see all menu options and make selections. Press the Enter key to select an option. 
 - Select EXIT to quit program.


## Credits
- addDepartment example provided by EdEx tutor Rene Trevino on 2/21/2024. He also advised me of the option to refactor my original code to avoid Express server APIs.
- A bootcamp classmate advised how to use forEach method to turn the SQL query results into array to be used for inquirer prompt lists.
- ChatGPT helped me to nest the SQL callback functions in updateEmployeeRole to make the code work sequentially rather than asynchoneously.


## License
MIT License