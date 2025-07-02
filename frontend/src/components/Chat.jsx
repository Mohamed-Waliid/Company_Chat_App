// src/components/Chat.jsx
import { useEffect, useState, useRef } from "react";
import { io } from "socket.io-client";
import "../App.css";

const socket = io("http://localhost:3002");

export default function Chat() {
  const [msg, setMsg] = useState("");
  const [messages, setMessages] = useState([]);
  const endRef = useRef();
  const [username, setUsername] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const payload = JSON.parse(atob(token.split(".")[1]));
    setUsername(payload.username);
    socket.emit("set_username", payload.username);
    socket.emit("load_messages"); 
  }, []);

  useEffect(() => {
    socket.on("chat_history", (history) => {
      setMessages(history);
    });

    socket.on("message", (m) => {
      setMessages((prev) => [...prev, m]);
    });

    return () => {
      socket.off("message");
      socket.off("chat_history");
    };
  }, []);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (!msg.trim()) return;
    socket.emit("private_message", { content: msg });
    setMsg("");
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="container">
      <h3 style={{ marginBottom: 5, color: "#333" }}>Hello, {username}</h3>
      <h2 style={{ marginTop: 0 }}>Company Chat</h2>
      <div className="chat-box">
        {messages.map((m, i) => {
          const isMe = m.from === username;
          return (
            <div
              key={i}
              className={`message-bubble ${isMe ? "me" : "other"}`}
            >
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
