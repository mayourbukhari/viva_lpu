submit your project github url and hosting url in the following excel sheet (hosting link should contain your name)
https://docs.google.com/spreadsheets/d/1Wk9aR_5t5waff0RXAhKMabCNcLh4U4fTmM0XWia7DGg/edit?usp=sharing

# 📋 TODO List MERN Stack Project

A **full-stack TODO list application** built using the **MERN stack (MongoDB, Express.js, React, Node.js)** with complete authentication, protected routes, and CRUD operations for tasks.

This project demonstrates setting up a MERN stack application, organizing folder structure, building APIs with authentication & authorization, connecting frontend & backend, and deploying the fullstack app.

---

## 🚀 Features

✅ **Project Setup & Folder Organization**

* Structured frontend and backend into separate folders.
* Configured connection between React frontend and Express backend.

✅ **Authentication & Authorization**

* JWT token generation and verification.
* Middleware for protected API routes.
* Password encryption with bcrypt.
* User validations during signup and login.

✅ **Routing with React Router DOM**

* Implemented client-side routing.
* Protected frontend routes for authenticated users.

✅ **Task Management (CRUD)**

* Users can:

  * 📝 Add tasks.
  * ✏️ Edit tasks.
  * ✅ Mark tasks as completed.
  * ❌ Delete tasks.
* Tasks are stored securely in **MongoDB**.

✅ **Database Schemas & Models**

* User schema and model.
* Task schema and model.

✅ **Backend Protected Routes**

* RESTful API routes secured with authentication middleware.

✅ **HTTP Requests & Responses**

* Used `axios` for frontend HTTP requests:

  * `GET`: Fetch tasks.
  * `POST`: Create new task.
  * `PUT`: Update existing task.
  * `DELETE`: Remove task.

✅ **Deployment**

* Hosted the **frontend** and **backend** on platforms like **Vercel/Netlify** (frontend) and **Render/Heroku** (backend).

✅ **Version Control**

* Created multiple versions (v1.0 - v1.8) using Git to track progress.

⚠️ **Copy-paste is strictly prohibited** — all code is original and written from scratch.

---

## 📂 Folder Structure

```
todo-mern/
├── backend/
│   ├── models/
│   │   ├── User.js
│   │   └── Task.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── taskRoutes.js
│   ├── middleware/
│   │   └── authMiddleware.js
│   ├── server.js
│   └── config/
│       └── db.js
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.js
│   │   ├── index.js
│   │   └── services/api.js
│   ├── package.json
└── README.md
```

---

## 🧑‍💻 Tech Stack

| Frontend         | Backend        | Database | Deployment        |
| ---------------- | -------------- | -------- | ----------------- |
| React.js         | Node.js        | MongoDB  | Vercel (frontend) |
| React Router DOM | Express.js     | Mongoose | Render (backend)  |
| Axios            | JWT, bcrypt.js |          | MongoDB Atlas     |

---

## 🔑 Key Functionalities

### 🔒 Authentication

* **Signup/Login**: User registration and login with validations.
* **JWT Tokens**: Issued and stored in HTTPOnly cookies/localStorage.

### 🗂 Task Operations (CRUD)

| Operation   | HTTP Method | API Endpoint     |
| ----------- | ----------- | ---------------- |
| Create Task | POST        | `/api/tasks`     |
| Read Tasks  | GET         | `/api/tasks`     |
| Update Task | PUT         | `/api/tasks/:id` |
| Delete Task | DELETE      | `/api/tasks/:id` |

---

## 🌐 Deployment Links

* 🔗 **Frontend**: [https://your-frontend-link.vercel.app](https://your-frontend-link.vercel.app)
* 🔗 **Backend API**: [https://your-backend-link.onrender.com](https://your-backend-link.onrender.com)

---

## 📖 How to Run Locally

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/<your-username>/todo-mern.git
cd todo-mern
```

### 2️⃣ Install Backend Dependencies

```bash
cd backend
npm install
```

### 3️⃣ Install Frontend Dependencies

```bash
cd ../frontend
npm install
```

### 4️⃣ Configure Environment Variables

Create a `.env` file in the backend directory:

```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000
```

### 5️⃣ Run the Application

Start backend:

```bash
cd backend
npm run dev
```

Start frontend:

```bash
cd ../frontend
npm start
```

---

## 📝 Additional Notes

✅ Fork the repository and create **6–8 versions** while building:

* v1.0: Project setup.
* v1.1: Connected frontend & backend.
* v1.2: User authentication.
* v1.3: Protected routes.
* v1.4: Task CRUD operations.
* v1.5: Styling and UI enhancements.
* v1.6: Deployment.
* v1.7: Bug fixes.
* v1.8: Final version.

⚡ All code written from scratch—**no copy-pasting**.

---

## 📌 Viva Highlights

* ✅ **Explain project setup and folder organization.**
* ✅ **Demonstrate JWT flow (token generation & verification).**
* ✅ **Show protected API and frontend routes.**
* ✅ **Discuss schema design for users & tasks.**
* ✅ **Demonstrate API calls using GET, POST, PUT, DELETE.**
* ✅ **Explain deployment process for frontend & backend.**

---


