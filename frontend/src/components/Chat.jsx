// src/components/Chat.jsx
import React, { useEffect, useState, useRef } from "react";
import { io } from "socket.io-client";
import { useNavigate } from "react-router-dom";
import "../App.css";

const socket = io("http://localhost:3002");

export default function Chat() {
  const [msg, setMsg] = useState("");
  const [messages, setMessages] = useState([]);
  const endRef = useRef();
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  // Initialize socket & load history
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      return navigate("/login");
    }
    const payload = JSON.parse(atob(token.split(".")[1]));
    setUsername(payload.username);
    socket.emit("set_username", payload.username);
    socket.emit("load_messages");
  }, [navigate]);

  // Listen for chat history and new messages
  useEffect(() => {
    socket.on("chat_history", (history) => setMessages(history));
    socket.on("message", (m) => setMessages((prev) => [...prev, m]));
    return () => {
      socket.off("chat_history");
      socket.off("message");
    };
  }, []);

  // Auto‑scroll
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (!msg.trim()) return;
    socket.emit("chat_message", { content: msg });
    setMsg("");
  };

  // ←–– NEW: logout handler
  const handleLogout = () => {
    socket.disconnect();             // optional, clean up connection
    localStorage.removeItem("token");
    navigate("/login");
  };

  const formatTime = (timestamp) =>
    new Date(timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  return (
    <div className="container">
      <div className="chat-header">
        <h3>Hello, {username}</h3>
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>

      <h2>Company Chat</h2>

      <div className="chat-box">
        {messages.map((m, i) => {
          const isMe = m.from === username;
          return (
            <div key={i} className={`message-bubble ${isMe ? "me" : "other"}`}>
              <div className="sender-name">{isMe ? "me" : m.from}</div>
              <div className="message-text">{m.content}</div>
              <div className="timestamp">{formatTime(m.timestamp)}</div>
            </div>
          );
        })}
        <div ref={endRef} />
      </div>

      <input
        value={msg}
        onChange={(e) => setMsg(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        placeholder="Type your message..."
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}
