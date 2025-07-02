const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
const connectDB = require("./DB/Config");
const User = require("./DB/Models/UserModel");
const Message = require("./DB/models/MessageModel");
const authMiddleware = require("./Middleware"); 
require("dotenv").config();
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*" },
});

const PORT = process.env.PORT || 3003; 
const JWT_SECRET = process.env.JWT_SECRET

app.use(cors());
app.use(express.json());


//Connect to MongoDB
connectDB()


//Register
app.post("/register", async (req, res) => {
  const { username, password } = req.body;

  const exists = await User.findOne({ username });
  if (exists) 
    return res.status(400).json({ message: "Username already exists" });

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({ username, password: hashedPassword });
  await newUser.save();

  res.status(201).json({ message: "User registered successfully" });
});

//Login
app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });
  if (!user) 
    return res.status(400).json({ message: "Invalid credentials" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) 
    return res.status(400).json({ message: "Invalid credentials" });

  const token = jwt.sign({ id: user._id, username }, JWT_SECRET, { expiresIn: "1h" });
  res.json({ token });
});


//Protected Example Route
app.get("/profile", authMiddleware , (req, res) => {
  res.json({ message: `Welcome, ${req.user.username}` });
});


//Socket.IO Setup
io.on("connection", (socket) => {
  socket.on("set_username", (username) => {
    socket.username = username;
  });

  socket.on("load_messages", async () => {
    const messages = await Message.find().sort({ timestamp: 1 }).limit(100);
    socket.emit("chat_history", messages);
  });

  socket.on("private_message", async ({ content }) => {
    const saved = await Message.create({ from: socket.username, content });
    io.emit("message", saved); // include timestamp from DB

  });
});
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
