// src/App.js
import React, { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import "./App.css";

const socket = io("http://localhost:3002");

function App() {
  const [msg, setMsg] = useState("");
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const handleMessage = (msg) => {
      setMessages((prev) => [...prev, msg]);
    };

    socket.on("message", handleMessage);

    return () => {
      socket.off("message", handleMessage);
    };
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (!msg.trim()) return;
    socket.emit("private_message", { to: "any", content: msg });
    setMsg("");
  };

  return (
    <div className="chat-container">
      <aside className="sidebar">
        <h2>Users</h2>
        <ul>
          <li className="online-user">You (connected)</li>
        </ul>
      </aside>

      <main className="chat-main">
        <div className="chat-header">Company Chat</div>

        <div className="chat-messages">
          {messages.map((m, i) => (
            <div
              key={i}
              className={`chat-bubble ${m.from === socket.id ? "own" : ""}`}
            >
              <strong>{m.from === socket.id ? "You" : m.from}</strong>:{" "}
              {m.content}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        <div className="chat-input">
          <input
            type="text"
            value={msg}
            onChange={(e) => setMsg(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            placeholder="Type a message..."
          />
          <button onClick={sendMessage}>Send</button>
        </div>
      </main>
    </div>
  );
}

export default App;
