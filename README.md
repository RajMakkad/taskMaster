# TaskMaster 

### Description:
This is not just a task completion app but an efficient task management application designed to help you manage your tasks more effectively.

### Features:

- Add tasks with priority and time.
- Mark tasks as complete.
- Update the description, time or priority of the task all at once.
- Delete tasks you no longer need.
- Filter tasks by priority. 
- Filter tasks according to the time you have in your hand.
- list all the task created by different users.

# Installation:

- Clone the repository: git clone https://github.com/RajMakkad/taskMaster
- Navigate to the project directory: `cd taskMaster`

1.Steps to run the backend
  - open the server side which is built on _Node_ and _Express_ : `cd server`
  - Install dependencies: `npm install`
  - Create a .env file which will have **mongodb_uri, localhost, port, secret** in it with required values. 
  - Run the Backend : `npm run dev`

2.Steps to run the Frontend
  - open the server side which is built on _Reactjs_ and _Tailwind_. : `cd client`
  - Install dependencies: `npm install`
  - Run the Backend : `npm run dev`

# Usage:
  - In this Application we can SignIn with a user and password. which is protected with JWT token.
  - Here we can create a task with **Task Name** , **Task Priority** and we can also assign the **Time** to the task.
  - Here all the routes are protected so a user can not login from different if they haven't Signed In there.
  - The NavBar at the top have different view of the Tasks . which will help the user to decide the task needed to be completed first accroding to time and priority.
