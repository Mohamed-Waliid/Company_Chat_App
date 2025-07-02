# 🏢 Company Chat App

A modern, real-time chat application built for internal company communication. Supports secure authentication, public group chat, and message history using Socket.IO, React, and MongoDB.

---

## ✨ Features

- ✅ User registration & login with JWT authentication  
- 💬 Real-time public group chat (company-wide)  
- 📜 Chat history (messages stored in MongoDB)  
- 📱 Responsive design — works on desktop and mobile  
- 🧾 Timestamps for messages  
- 🚪 Logout functionality  
- ⚡ Built with React, Node.js, Express, Socket.IO, MongoDB  

---

## 🖥️ Tech Stack

**Frontend:**
- React (with React Router)
- CSS (no UI framework)
- Socket.IO Client

**Backend:**
- Node.js + Express
- MongoDB + Mongoose
- Socket.IO Server
- JSON Web Tokens (JWT)
- bcryptjs

---

## 📁 Project Structure

ChatGPT said:
Sure! Here’s the entire professional README.md in a single copy-paste-ready format:

markdown
Copy
Edit
# 🏢 Company Chat App

A modern, real-time chat application built for internal company communication. Supports secure authentication, public group chat, and message history using Socket.IO, React, and MongoDB.

---

## ✨ Features

- ✅ User registration & login with JWT authentication  
- 💬 Real-time public group chat (company-wide)  
- 📜 Chat history (messages stored in MongoDB)  
- 📱 Responsive design — works on desktop and mobile  
- 🧾 Timestamps for messages  
- 🚪 Logout functionality  
- ⚡ Built with React, Node.js, Express, Socket.IO, MongoDB  

---

## 🖥️ Tech Stack

**Frontend:**
- React (with React Router)
- CSS (no UI framework)
- Socket.IO Client

**Backend:**
- Node.js + Express
- MongoDB + Mongoose
- Socket.IO Server
- JSON Web Tokens (JWT)
- bcryptjs

---

## 🔐 Environment Variables

Create a `.env` file inside the `Backend/` directory:

PORT=3002
MONGODB_URI=mongodb://localhost:27017/chat-app
JWT_SECRET=your_super_secret_key

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/Mohamed-Waliid/Company_Chat_App.git
cd chat-app
```
### 2.Install Backend Dependencies
```bash
cd Backend
npm install
npm run dev
```

### 3. Install Frontend Dependencies
```bash
cd ../Frontend
npm install
npm start
```

---

## ✅ Usage
Register a new user from /register

Login via /login

You’ll be redirected to the chat page

Start chatting in the company-wide public chat room
