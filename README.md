# Notes Taking Application

A **Notes Taking Application** built with **TypeScript**, **Node.js**, and **Express**, with **MongoDB** for database storage. The application supports user authentication, secure note management, and email notifications.  

This project is **structured for scalability** and maintainability, following best practices for a modular and well-organized backend.

---

## Features

- **User Authentication**: Sign up and login with JWT-based authentication.  
- **CRUD Notes**: Create, read, update, and delete notes securely.  
- **Email Notifications**: Send emails using Nodemailer.  
- **Environment Config**: Manage secrets using `.env`.  
- **TypeScript Support**: Fully typed backend for better developer experience.  

---

## Tech Stack

- **Backend**: Node.js, Express, TypeScript  
- **Database**: MongoDB with Mongoose  
- **Authentication**: JWT (JSON Web Tokens)  
- **Email**: Nodemailer  
- **Others**: bcrypt for password hashing, dotenv for environment variables, cors for CORS handling, nodemon for development  

---

## Installation

1. **Clone the repository**

```bash
git clone https://github.com/mohit-bhandari45/hd-backend
cd hd-backend
```

2. **Install dependencies**

```bash
npm install
```

3. **Create a .env file in the root directory and add:**

```env
PORT=5000
MONGO_URI=<your-mongodb-uri>
JWT_SECRET=<your-jwt-secret>
EMAIL_USER=<your-email>
EMAIL_PASS=<your-email-password>
```

4. **Start the development server**

```bash
npm run dev
```

5. **Build and run in production**

```bash
npm run build
npm start
```

## Project Structure
This project is designed to be scalable and modular, making it easy to maintain and extend as the application grows:
```pysql
src/
├─ @types/express/        # Custom type declarations for Express
├─ config/                # Configuration files (database, email service)
│  ├─ database.ts
│  └─ email.service.ts
├─ controller/            # Route controllers handling business logic
│  ├─ auth.controller.ts
│  └─ user.controller.ts
├─ model/                 # Mongoose models
│  ├─ content.model.ts
│  ├─ otp.model.ts
│  └─ user.model.ts
├─ routes/                # Express routes
│  ├─ auth.route.ts
│  └─ user.route.ts
├─ utils/                 # Helper functions and utilities
│  ├─ generateOTP.ts
│  └─ index.ts
├─ middleware.ts          # Middleware functions (auth, error handling, etc.)
└─ index.ts               # Entry point of the application
```

## Other files:
.gitignore – Files and folders to ignore in git
README.md – Project documentation
nodemon.json – Nodemon configuration
package.json – Project dependencies and scripts
tsconfig.json – TypeScript configuration