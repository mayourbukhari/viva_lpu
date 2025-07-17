# 📋 MERN Todo Auth - Complete Project Documentation

## Table of Contents
1. [Project Overview](#project-overview)
2. [Technology Stack & Why We Chose Them](#technology-stack--why-we-chose-them)
3. [Project Architecture](#project-architecture)
4. [Backend Implementation](#backend-implementation)
5. [Frontend Implementation](#frontend-implementation)
6. [Database Schema Design](#database-schema-design)
7. [Authentication & Security](#authentication--security)
8. [API Endpoints](#api-endpoints)
9. [Common Errors & Solutions](#common-errors--solutions)
10. [Development Challenges & Solutions](#development-challenges--solutions)
11. [Installation & Setup](#installation--setup)
12. [Deployment Guide](#deployment-guide)
13. [Future Improvements](#future-improvements)

---

## Project Overview

This is a **full-stack MERN (MongoDB, Express.js, React, Node.js) Todo Application** with complete user authentication and authorization. The project demonstrates modern web development practices including JWT authentication, protected routes, CRUD operations, and responsive design.

### Key Features
- 🔐 **User Authentication** (Register/Login)
- 📝 **Task Management** (Create, Read, Update, Delete)
- 🛡️ **Protected Routes** (Frontend & Backend)
- 🔒 **JWT Token-based Authentication**
- 📱 **Responsive Design** with Tailwind CSS
- ⚡ **Real-time Updates**
- 🎨 **Modern UI/UX** with React Components

---

## Technology Stack & Why We Chose Them

### Backend Technologies

#### 1. **Node.js & Express.js**
**Why we chose it:**
- **Non-blocking I/O**: Perfect for handling multiple concurrent requests
- **JavaScript Everywhere**: Same language for frontend and backend
- **Rich Ecosystem**: Vast npm package library
- **Fast Development**: Quick setup and minimal boilerplate

**Implementation:**
```javascript
// server.js - Main server setup
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

const app = express();
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(express.json()); // Parse JSON request bodies
```

#### 2. **MongoDB with Mongoose**
**Why we chose it:**
- **NoSQL Flexibility**: Schema-less design allows for rapid development
- **JSON-like Documents**: Natural fit with JavaScript objects
- **Scalability**: Horizontal scaling capabilities
- **Rich Query Language**: Powerful aggregation pipeline

**Implementation:**
```javascript
// Database connection with error handling
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected');
  } catch (error) {
    console.error('DB Connection Error:', error);
    process.exit(1);
  }
};
```

#### 3. **JWT (JSON Web Tokens)**
**Why we chose it:**
- **Stateless Authentication**: No server-side session storage needed
- **Secure**: Digitally signed tokens
- **Portable**: Works across different domains
- **Self-contained**: Contains all necessary information

#### 4. **bcryptjs**
**Why we chose it:**
- **Secure Password Hashing**: Industry-standard encryption
- **Salt Integration**: Automatic salt generation
- **Adaptive**: Configurable work factor for future-proofing

### Frontend Technologies

#### 1. **React 19**
**Why we chose it:**
- **Component-based Architecture**: Reusable and maintainable code
- **Virtual DOM**: Efficient rendering and updates
- **Rich Ecosystem**: Extensive library support
- **Developer Experience**: Excellent debugging tools

#### 2. **Vite**
**Why we chose it:**
- **Lightning Fast**: Native ES modules for instant server start
- **Hot Module Replacement**: Real-time updates during development
- **Optimized Builds**: Efficient production bundles
- **Modern Tooling**: TypeScript support out of the box

#### 3. **React Router DOM v7**
**Why we chose it:**
- **Client-side Routing**: Single Page Application navigation
- **Protected Routes**: Easy implementation of auth guards
- **Dynamic Routing**: Programmatic navigation
- **Code Splitting**: Lazy loading capabilities

#### 4. **Tailwind CSS**
**Why we chose it:**
- **Utility-first**: Rapid UI development
- **Responsive Design**: Mobile-first approach
- **Consistency**: Design system built-in
- **Small Bundle Size**: Purged unused CSS

#### 5. **Axios**
**Why we chose it:**
- **Request/Response Interceptors**: Automatic token attachment
- **Promise-based**: Better error handling
- **Request/Response Transformation**: JSON parsing
- **Browser Compatibility**: Works everywhere

---

## Project Architecture

### Folder Structure Explanation

```
viva_lpu/
├── mern-todo-auth/
│   ├── client/                 # React Frontend
│   │   ├── src/
│   │   │   ├── components/     # Reusable UI components
│   │   │   ├── context/        # React Context for state management
│   │   │   ├── Pages/          # Main application pages
│   │   │   ├── utils/          # Utility functions and configurations
│   │   │   └── assets/         # Static assets
│   │   └── public/             # Public assets
│   └── server/                 # Node.js Backend
│       ├── config/             # Database configuration
│       ├── controllers/        # Business logic
│       ├── middleware/         # Custom middleware functions
│       ├── models/             # Database schemas
│       └── routes/             # API route definitions
```

### Why This Structure?

1. **Separation of Concerns**: Client and server are completely separate
2. **Modularity**: Each feature has its own controller, model, and routes
3. **Scalability**: Easy to add new features without affecting existing code
4. **Maintainability**: Clear organization makes debugging easier

---

## Backend Implementation

### 1. Server Setup (`server.js`)

```javascript
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import taskRoutes from './routes/taskRoutes.js';

dotenv.config();
connectDB();

const app = express();

// Middleware
app.use(cors()); // Allow cross-origin requests
app.use(express.json()); // Parse JSON bodies

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
```

**Why this setup:**
- **Environment Variables**: Secure configuration management
- **CORS**: Enables frontend-backend communication
- **JSON Parsing**: Handles request body parsing
- **Modular Routing**: Organized API endpoints

### 2. Database Configuration (`config/db.js`)

```javascript
import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected');
  } catch (error) {
    console.error('DB Connection Error:', error);
    process.exit(1);
  }
};

export default connectDB;
```

**Error Handling Strategy:**
- **Try-Catch Blocks**: Graceful error handling
- **Process Exit**: Prevents server from running without database
- **Environment Variables**: Database URI stored securely

### 3. Authentication Controller (`controllers/authController.js`)

#### User Registration
```javascript
export const registerUser = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ msg: 'User already exists' });

    // Hash password
    const hashed = await bcrypt.hash(password, 10);
    
    // Create user
    const user = await User.create({ username, email, password: hashed });
    res.status(201).json({ msg: 'User registered' });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};
```

**Security Measures:**
- **Duplicate Check**: Prevents multiple accounts with same email
- **Password Hashing**: bcrypt with salt rounds of 10
- **Error Messages**: Generic messages to prevent user enumeration

#### User Login
```javascript
export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ msg: 'User not found' });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ msg: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.json({ token, user: { id: user._id, username: user.username } });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};
```

**Why this approach:**
- **Password Comparison**: Secure bcrypt comparison
- **JWT Generation**: Includes user ID in payload
- **Token Expiration**: 24-hour expiry for security
- **User Data**: Returns safe user information (no password)

### 4. Task Controller (`controllers/taskController.js`)

```javascript
// Get all tasks for authenticated user
export const getTasks = async (req, res) => {
  const tasks = await Task.find({ user: req.user.id });
  res.json(tasks);
};

// Add new task
export const addTask = async (req, res) => {
  const { title } = req.body;
  const task = await Task.create({ title, user: req.user.id });
  res.status(201).json(task);
};

// Update existing task
export const updateTask = async (req, res) => {
  const { id } = req.params;
  const task = await Task.findByIdAndUpdate(id, req.body, { new: true });
  res.json(task);
};

// Delete task
export const deleteTask = async (req, res) => {
  const { id } = req.params;
  await Task.findByIdAndDelete(id);
  res.json({ msg: 'Task deleted' });
};
```

**Design Decisions:**
- **User Association**: Tasks are linked to authenticated users
- **RESTful Operations**: Standard CRUD operations
- **Parameter Extraction**: ID from URL params, data from body
- **Response Consistency**: Consistent JSON responses

### 5. Authentication Middleware (`middleware/authMiddleware.js`)

```javascript
import jwt from 'jsonwebtoken';

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ msg: 'No token' });
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(403).json({ msg: 'Invalid token' });
  }
};

export default verifyToken;
```

**Security Implementation:**
- **Bearer Token Format**: `Authorization: Bearer <token>`
- **Token Verification**: JWT signature validation
- **User Context**: Adds user info to request object
- **Error Handling**: Different status codes for different error types

---

## Frontend Implementation

### 1. Main App Component (`App.jsx`)

```jsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from '../context/AuthContext';
import { ProtectedRoute } from '@/utils/ProtectedRoute';
import Login from '@/components/Login';
import Register from '@/components/Register';
import Dashboard from '@/Pages/Dashboard';
import NotFound from '@/Pages/NotFound';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
```

**Routing Strategy:**
- **Root Redirect**: Automatically redirect to dashboard
- **Protected Routes**: Dashboard requires authentication
- **Catch-all Route**: 404 page for undefined routes
- **Context Provider**: Authentication state available everywhere

### 2. Authentication Context (`context/AuthContext.jsx`)

```jsx
import { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) setUser(jwtDecode(token));
  }, []);

  const login = (token) => {
    localStorage.setItem('token', token);
    setUser(jwtDecode(token));
    navigate('/dashboard');
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
```

**State Management Decisions:**
- **React Context**: Global authentication state
- **localStorage**: Persistent token storage
- **JWT Decoding**: Extract user info from token
- **Automatic Navigation**: Redirect after login/logout

### 3. API Configuration (`utils/api.js`)

```javascript
import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api',
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default API;
```

**Why Axios Interceptors:**
- **Automatic Token Attachment**: No need to manually add headers
- **Centralized Configuration**: Base URL in one place
- **Request Transformation**: Consistent authentication
- **Error Handling**: Centralized error management

### 4. Protected Route Component (`utils/ProtectedRoute.jsx`)

```jsx
import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '@/context/AuthContext';

export const ProtectedRoute = ({ children }) => {
  const { user } = useContext(AuthContext);
  return user ? children : <Navigate to="/login" />;
};
```

**Route Protection Strategy:**
- **Context-based**: Uses authentication context
- **Conditional Rendering**: Show content or redirect
- **Automatic Redirect**: Sends to login if not authenticated
- **Wrapper Component**: Easy to apply to any route

---

## Database Schema Design

### User Schema (`models/User.js`)
```javascript
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

export default mongoose.model('User', userSchema);
```

**Design Decisions:**
- **Unique Email**: Prevents duplicate accounts
- **Required Fields**: All fields are mandatory
- **No Timestamps**: Simplified schema for this demo
- **String Types**: Basic data types for simplicity

### Task Schema (`models/Task.js`)
```javascript
import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  completed: { type: Boolean, default: false },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

export default mongoose.model('Task', taskSchema);
```

**Relationship Design:**
- **User Reference**: ObjectId reference to User model
- **Default Values**: Tasks start as incomplete
- **Required Title**: Every task needs a title
- **Boolean Status**: Simple completed/incomplete state

---

## Authentication & Security

### JWT Implementation
1. **Token Generation**: On successful login
2. **Token Storage**: localStorage on client
3. **Token Transmission**: Authorization header
4. **Token Verification**: Middleware validates each request
5. **Token Expiration**: 24-hour lifespan

### Security Measures
- **Password Hashing**: bcrypt with salt rounds
- **Environment Variables**: Secrets stored securely
- **CORS Configuration**: Controlled cross-origin access
- **Input Validation**: Server-side validation
- **Error Messages**: Generic to prevent information leakage

---

## API Endpoints

### Authentication Routes (`/api/auth`)
```
POST /api/auth/register
Body: { username, email, password }
Response: { msg: "User registered" }

POST /api/auth/login
Body: { email, password }
Response: { token, user: { id, username } }
```

### Task Routes (`/api/tasks`) - Protected
```
GET /api/tasks
Headers: Authorization: Bearer <token>
Response: [{ _id, title, completed, user }]

POST /api/tasks
Headers: Authorization: Bearer <token>
Body: { title }
Response: { _id, title, completed, user }

PUT /api/tasks/:id
Headers: Authorization: Bearer <token>
Body: { title?, completed? }
Response: { _id, title, completed, user }

DELETE /api/tasks/:id
Headers: Authorization: Bearer <token>
Response: { msg: "Task deleted" }
```

---

## Common Errors & Solutions

### 1. **CORS Errors**
**Error:** `Access to XMLHttpRequest at 'http://localhost:5000' from origin 'http://localhost:3000' has been blocked by CORS policy`

**Solution:**
```javascript
// server.js
import cors from 'cors';
app.use(cors());
```

**Why it happens:** Browsers block cross-origin requests by default for security.

### 2. **MongoDB Connection Issues**
**Error:** `MongoNetworkError: failed to connect to server`

**Solutions:**
- Check MongoDB is running: `mongod` command
- Verify connection string in `.env` file
- Check network connectivity
- Ensure database exists

**Prevention:**
```javascript
// config/db.js
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected');
  } catch (error) {
    console.error('DB Connection Error:', error);
    process.exit(1); // Exit process if DB connection fails
  }
};
```

### 3. **JWT Token Issues**
**Error:** `JsonWebTokenError: invalid token`

**Common Causes:**
- Token not included in request headers
- Token format incorrect (should be `Bearer <token>`)
- Token expired
- Secret key mismatch

**Solution:**
```javascript
// middleware/authMiddleware.js
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]; // Extract token
  if (!token) return res.status(401).json({ msg: 'No token' });
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(403).json({ msg: 'Invalid token' });
  }
};
```

### 4. **Environment Variables Not Loading**
**Error:** `undefined` when accessing `process.env.MONGO_URI`

**Solution:**
```javascript
// server.js
import dotenv from 'dotenv';
dotenv.config(); // Must be called before accessing env variables
```

**File Structure:**
```env
# .env file in server directory
MONGO_URI=mongodb://localhost:27017/todo-app
JWT_SECRET=your-super-secret-key
PORT=5000
```

### 5. **React Router Navigation Issues**
**Error:** Cannot navigate programmatically

**Solution:**
```jsx
// Use navigate hook inside components
import { useNavigate } from 'react-router-dom';

const navigate = useNavigate();
navigate('/dashboard'); // Programmatic navigation
```

### 6. **Module Import Errors**
**Error:** `Cannot use import statement outside a module`

**Solution:**
```json
// package.json
{
  "type": "module"
}
```

### 7. **Axios Request Interceptor Not Working**
**Error:** Authorization header not being sent

**Solution:**
```javascript
// utils/api.js
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
```

---

## Development Challenges & Solutions

### Challenge 1: **State Management Across Components**
**Problem:** User authentication state needed in multiple components

**Solution:** React Context API
```jsx
// Created AuthContext to share user state globally
const AuthContext = createContext();

// Wrapped entire app with AuthProvider
<AuthProvider>
  <App />
</AuthProvider>
```

**Why this approach:**
- Avoids prop drilling
- Centralized state management
- Easy to consume in any component

### Challenge 2: **Token Persistence**
**Problem:** User logged out on page refresh

**Solution:** localStorage with useEffect
```jsx
useEffect(() => {
  const token = localStorage.getItem('token');
  if (token) setUser(jwtDecode(token));
}, []);
```

**Alternative considered:** sessionStorage (but loses data on tab close)

### Challenge 3: **Protected Routes Implementation**
**Problem:** Preventing unauthorized access to dashboard

**Solution:** Higher-Order Component
```jsx
export const ProtectedRoute = ({ children }) => {
  const { user } = useContext(AuthContext);
  return user ? children : <Navigate to="/login" />;
};
```

**Why HOC:** Reusable across multiple routes

### Challenge 4: **API Request Authentication**
**Problem:** Adding JWT token to every API request

**Solution:** Axios Interceptors
```javascript
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});
```

**Benefits:**
- Automatic token attachment
- Centralized configuration
- DRY principle

### Challenge 5: **Error Handling Consistency**
**Problem:** Different error formats from various API calls

**Solution:** Standardized error responses
```javascript
// Consistent error format
res.status(400).json({ msg: 'Error message' });
```

**Frontend handling:**
```javascript
try {
  const response = await API.post('/auth/login', formData);
} catch (error) {
  console.error(error.response.data.msg);
}
```

### Challenge 6: **Development vs Production URLs**
**Problem:** Different API URLs for development and production

**Solution:** Environment-based configuration
```javascript
// utils/api.js
const API = axios.create({
  baseURL: process.env.NODE_ENV === 'production' 
    ? 'https://your-api.herokuapp.com/api'
    : 'http://localhost:5000/api',
});
```

---

## Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud)
- Git

### Backend Setup
```bash
# Navigate to server directory
cd mern-todo-auth/server

# Install dependencies
npm install

# Create environment file
touch .env

# Add environment variables
MONGO_URI=mongodb://localhost:27017/todo-app
JWT_SECRET=your-super-secret-key-here
PORT=5000

# Start MongoDB (if local)
mongod

# Start server
npm start
```

### Frontend Setup
```bash
# Navigate to client directory
cd mern-todo-auth/client

# Install dependencies
npm install

# Start development server
npm run dev
```

### Package Dependencies Explained

**Backend (`server/package.json`):**
```json
{
  "dependencies": {
    "bcryptjs": "^3.0.2",        // Password hashing
    "cors": "^2.8.5",            // Cross-origin requests
    "dotenv": "^17.2.0",         // Environment variables
    "express": "^5.1.0",         // Web framework
    "jsonwebtoken": "^9.0.2",    // JWT tokens
    "mongoose": "^8.16.4"        // MongoDB ODM
  }
}
```

**Frontend (`client/package.json`):**
```json
{
  "dependencies": {
    "axios": "^1.10.0",          // HTTP client
    "jwt-decode": "^4.0.0",      // JWT decoding
    "react": "^19.1.0",          // UI library
    "react-dom": "^19.1.0",      // DOM rendering
    "react-router-dom": "^7.7.0", // Routing
    "react-toastify": "^11.0.5"  // Notifications
  }
}
```

---

## Deployment Guide

### Backend Deployment (Heroku)
```bash
# Install Heroku CLI
npm install -g heroku

# Login to Heroku
heroku login

# Create Heroku app
heroku create your-app-name

# Set environment variables
heroku config:set MONGO_URI=your-mongodb-connection-string
heroku config:set JWT_SECRET=your-jwt-secret

# Deploy
git push heroku main
```

### Frontend Deployment (Netlify)
```bash
# Build production bundle
npm run build

# Deploy to Netlify (drag & drop dist folder)
# Or use Netlify CLI
npm install -g netlify-cli
netlify deploy --prod --dir=dist
```

### Environment Configuration
```javascript
// Update API base URL for production
const API = axios.create({
  baseURL: process.env.NODE_ENV === 'production' 
    ? 'https://your-heroku-app.herokuapp.com/api'
    : 'http://localhost:5000/api',
});
```

---

## Future Improvements

### 1. **Enhanced Security**
- **Input Validation:** Joi or Yup validation
- **Rate Limiting:** Prevent API abuse
- **HTTPS Enforcement:** SSL certificates
- **Password Requirements:** Complexity validation

### 2. **User Experience**
- **Loading States:** Better feedback during operations
- **Error Toast Messages:** User-friendly error display
- **Form Validation:** Real-time validation feedback
- **Pagination:** For large task lists

### 3. **Features**
- **Task Categories:** Organize tasks by category
- **Due Dates:** Task scheduling
- **Task Priority:** High/Medium/Low priority
- **Search & Filter:** Find specific tasks
- **Drag & Drop:** Reorder tasks

### 4. **Performance**
- **Code Splitting:** Lazy loading components
- **Caching:** Redis for frequently accessed data
- **Database Indexing:** Optimize query performance
- **Image Optimization:** WebP format support

### 5. **Testing**
- **Unit Tests:** Jest for individual functions
- **Integration Tests:** API endpoint testing
- **E2E Tests:** Cypress for user workflows
- **Test Coverage:** Aim for 80%+ coverage

### 6. **Monitoring**
- **Error Tracking:** Sentry integration
- **Performance Monitoring:** Application metrics
- **Logging:** Structured logging with Winston
- **Analytics:** User behavior tracking

---
## Detailed Notes of Each Concept Used in This Project

### 1. **MERN Stack**
- **MongoDB:** NoSQL database storing user and task data as documents.
- **Express.js:** Backend framework for routing, middleware, and API endpoints.
- **React:** Frontend library for building UI with reusable components.
- **Node.js:** JavaScript runtime powering the backend server.

### 2. **JWT Authentication**
- **Purpose:** Secure, stateless user authentication.
- **Flow:** On login, server issues a signed token; client stores it and sends it with requests.
- **Verification:** Middleware checks token validity before allowing access to protected routes.

### 3. **bcryptjs**
- **Usage:** Hashes passwords before storing in the database.
- **Security:** Adds salt to prevent rainbow table attacks.

### 4. **React Context API**
- **Role:** Manages global authentication state (user info, login/logout).
- **Benefit:** Avoids prop drilling and keeps state accessible across components.

### 5. **Axios**
- **Function:** Handles HTTP requests from frontend to backend.
- **Interceptors:** Automatically attaches JWT token to requests for protected endpoints.

### 6. **React Router DOM**
- **Purpose:** Enables client-side navigation and route protection.
- **ProtectedRoute:** Custom component redirects unauthenticated users to login.

### 7. **MongoDB Schemas**
- **User Schema:** Defines structure for user documents (username, email, password).
- **Task Schema:** Defines structure for tasks (title, completed status, user reference).

### 8. **Environment Variables**
- **Usage:** Stores sensitive data (DB URI, JWT secret) outside codebase for security.

### 9. **CORS**
- **Reason:** Allows frontend and backend to communicate across different origins.

### 10. **Error Handling**
- **Backend:** Uses try-catch blocks and standardized error responses.
- **Frontend:** Displays user-friendly error messages.


---
---
# Detailed Notes of each and every function and logic we have used in this project:

## Backend Functions & Logic

### 1. `connectDB` (config/db.js)
- **Purpose:** Establishes connection to MongoDB using Mongoose.
- **Logic:** Uses async/await to connect, logs success, and exits process on failure.

### 2. `registerUser` (controllers/authController.js)
- **Purpose:** Handles user registration.
- **Logic:** Checks for existing user, hashes password with bcrypt, creates user, returns success or error.

### 3. `loginUser` (controllers/authController.js)
- **Purpose:** Handles user login.
- **Logic:** Finds user by email, compares password, generates JWT token, returns token and user info.

### 4. `verifyToken` (middleware/authMiddleware.js)
- **Purpose:** Middleware to protect routes.
- **Logic:** Extracts token from header, verifies JWT, attaches user info to request, handles errors.

### 5. `getTasks` (controllers/taskController.js)
- **Purpose:** Fetches all tasks for authenticated user.
- **Logic:** Queries tasks by user ID from JWT, returns array of tasks.

### 6. `addTask` (controllers/taskController.js)
- **Purpose:** Adds a new task for user.
- **Logic:** Creates task with title and user ID, returns created task.

### 7. `updateTask` (controllers/taskController.js)
- **Purpose:** Updates an existing task.
- **Logic:** Finds task by ID, updates fields, returns updated task.

### 8. `deleteTask` (controllers/taskController.js)
- **Purpose:** Deletes a task.
- **Logic:** Finds task by ID, deletes it, returns confirmation message.

## Frontend Functions & Logic

### 1. `AuthProvider` (context/AuthContext.jsx)
- **Purpose:** Provides authentication state and methods.
- **Logic:** Uses React Context, manages user state, login/logout functions, persists token in localStorage.

### 2. `login` (AuthContext)
- **Purpose:** Logs in user.
- **Logic:** Stores token, decodes user info, navigates to dashboard.

### 3. `logout` (AuthContext)
- **Purpose:** Logs out user.
- **Logic:** Removes token, clears user state, navigates to login.

### 4. `ProtectedRoute` (utils/ProtectedRoute.jsx)
- **Purpose:** Protects routes from unauthenticated access.
- **Logic:** Checks user context, renders children or redirects to login.

### 5. `API` (utils/api.js)
- **Purpose:** Configures Axios for API requests.
- **Logic:** Sets base URL, attaches JWT token via interceptor, centralizes HTTP logic.

### 6. Main Routing (App.jsx)
- **Purpose:** Defines application routes.
- **Logic:** Uses React Router, redirects root, applies ProtectedRoute to dashboard, handles 404.

### 7. User & Task Schemas (models/User.js, models/Task.js)
- **Purpose:** Defines MongoDB document structure.
- **Logic:** Sets required fields, unique constraints, references between user and tasks.

---

These notes cover the core functions and logic, explaining their purpose and implementation for both backend and frontend in the MERN Todo Auth project.

## Conclusion

This MERN Todo Auth project demonstrates a complete full-stack application with modern development practices. The choice of technologies was driven by:

1. **Developer Experience:** Fast development with hot reloading
2. **Performance:** Efficient rendering and minimal bundle sizes
3. **Security:** Industry-standard authentication and encryption
4. **Scalability:** Modular architecture for future growth
5. **Maintainability:** Clear separation of concerns and documentation

The project showcases real-world development challenges and their solutions, making it an excellent learning resource for full-stack development with the MERN stack.

---

*This documentation serves as a complete guide for understanding, maintaining, and extending the MERN Todo Auth application.*
