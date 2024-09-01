# DevTrack

An intuitive platform that empowers teams to collaborate, track progress, and deliver projects with precision.

## Installation

This project can be set up either using Docker or by installing the components manually. Choose the method that best suits your environment and preferences.

## Option 1: Using docker

Prerequisites

* Docker
* Docker Compose

### Steps

1. Clone the repository

```bash
git clone https://github.com/Shinzo27/DevTrack.git
cd DevTrack
```

2. Create .env file in Backend/Config and copy .env.example.

3. Add MongoDB URI in the .env file.

4. Build and run the Docker containers:

```bash
docker-compose up --build
```

5. Access the application at http://localhost:3000

## Option 2: Without docker (Manually)

Prerequisites

* Node.js(v14 or later)
* npm
* MongoDB

### Steps

1. Clone the repository

```bash
git clone https://github.com/Shinzo27/DevTrack.git
cd DevTrack
```

2. Install backend dependencies:
```bash
cd Backend
npm install
```

3. Create .env file in Backend/Config and copy .env.example

4. Add MongoDB URI in the .env file.

5. Start the backend server

```bash
npm start
```

6. In a new terminal, install frontend dependencies:
```bash
cd Frontend
npm install
```

7. Start the frontend development server:
```bash
npm start
```

## credentials

```bash
email: testuser@gmail.com
password: testuser123
```

# Features

Our MERN-based project management tool offers a comprehensive set of features designed to streamline your workflow and enhance team collaboration:

1. **User Authentication**: Secure sign-up and login functionality with JWT authentication.

2. **Project Creation and Management**: 
   - Create, edit, and delete projects
   - Set project deadlines
   - Invite team members to projects

3. **Task Management**:
   - Create, assign, and track tasks within projects
   - Set due dates for tasks
   - Update task status

4. **Team Collaboration**:
   - Real-time updates on project and task changes
   - Comment system for tasks to facilitate discussions
   - File attachment capability for sharing resources

5. **Dashboard and Analytics**:
   - Overview of all projects and their status
   - Nearly Deadlines
   - Stats of all the projects combined

6. **Notification System**:
   - Email notifications for task assignments and updates
   - In-app notifications for real-time updates

7. **Responsive Design**:
   - Fully responsive web application, accessible on desktop and mobile devices

8. **API Integration**:
    - RESTful API for potential integrations with other tools

# Tech Stack

Our project management tool is built using the MERN (MongoDB, Express.js, React, Node.js) stack, providing a robust and scalable foundation for the application.

## Frontend:
- **React**: A JavaScript library for building user interfaces
- **ContextApi**: For state management
- **React Router**: For handling routing in the React application
- **Axios**: For making HTTP requests to the backend
- **Tailwind Css**: For consistent and responsive UI components

## Backend:
- **Node.js**: JavaScript runtime for the server
- **Express.js**: Web application framework for Node.js
- **MongoDB**: NoSQL database for storing application data
- **Mongoose**: ODM (Object Data Modeling) library for MongoDB and Node.js
- **JSON Web Token (JWT)**: For secure authentication
- **Bcrypt**: For password hashing
- **Socket.it**: For real-time updates and notifications

## Development and Deployment Tools:
- **ESLint**: For code linting
- **Docker**: For containerization and easy deployment
- **GitHub Actions**: For CI/CD pipelines

## Contributing

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.

Please make sure to update tests as appropriate.

## Authors and acknowledgment
- [Pratham Patel](https://github.com/Shinzo27)

## License

[MIT](https://choosealicense.com/licenses/mit/)