mern-todo-auth/
├── client/                # React Frontend
│   ├── public/
│   └── src/
│       ├── components/
│       │   ├── Navbar.jsx
│       │   ├── Login.jsx
│       │   ├── Register.jsx
│       │   ├── TodoForm.jsx
│       │   └── TaskList.jsx
│       ├── pages/
│       │   ├── Dashboard.jsx
│       │   └── NotFound.jsx
│       ├── context/
│       │   └── AuthContext.jsx
│       ├── utils/
│       │   └── PrivateRoute.jsx
│       ├── App.jsx
│       ├── main.jsx
│       └── api.js
│
├── server/               # Backend
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── authController.js
│   │   └── taskController.js
│   ├── middleware/
│   │   └── authMiddleware.js
│   ├── models/
│   │   ├── User.js
│   │   └── Task.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── taskRoutes.js
│   ├── .env
│   ├── server.js
│   └── package.json
│
├── README.md
└── package.json (root for scripts, optional concurrently)
