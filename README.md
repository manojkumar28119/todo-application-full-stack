# Todo Web Application

## Objective
The objective of this project is to develop a Todo Web Application where users can manage their daily tasks by storing them and updating their status. The application supports user authentication, task management, and profile management.

## Features
- **User Authentication:**
  - User registration (signup) with necessary details.
  - User login with JWT-based authentication.
  - Secure API routes to ensure only authenticated users can access certain features.

- **Todo Management:**
  - Create, Read, Update, Delete (CRUD) operations for managing daily tasks.
  - Users can add new tasks, view a list of tasks, edit existing tasks, and delete tasks.
  - Users can update the status of each task. The available statuses include "done," "pending," "in progress," and "completed."

- **User Profile Management:**
  - CRUD operations for managing the user’s profile.
  - Users can update their profile information, such as name, email, and password.
  - Profile updates are accessible only to the authenticated user.

## Technologies Used
- **Frontend:**
  - ReactJS for building the user interface.
  - React Router for handling client-side routing.

- **Backend:**
  - Node.js with Express for creating RESTful APIs.
  - JWT (JSON Web Tokens) for user authentication.
  - UUID for generating unique IDs for tasks and users.
  - SQLite3 for database management.


## API Endpoints

### User Authentication
- **POST `/register`**: Register a new user.
- **POST `/login`**: Log in an existing user and receive a JWT token.

### Todo Management
- **POST `/`**: Get all todos for the authenticated user.
- **POST `/add-todo`**: Add a new todo.
- **PUT `/change-status`**: Update the status of a todo.
- **DELETE `/delete-todo`**: Delete a todo.

### User Profile Management
- **POST `/profile`**: Get user profile details.
- **PUT `/update-profile`**: Update the user’s profile information.

## Deployed link: https://todo-application-by-mk.netlify.app/
