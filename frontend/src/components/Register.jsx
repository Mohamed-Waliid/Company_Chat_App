import { useState } from "react";
import { register } from "../api";
import "../App.css";

export default function Register() {
  const [form, setForm] = useState({ username: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await register(form);
    alert(res.message);
  };

  return (
    <div className="container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input placeholder="Username" onChange={e => setForm({ ...form, username: e.target.value })} required />
        <input type="password" placeholder="Password" onChange={e => setForm({ ...form, password: e.target.value })} required />
        <button type="submit">Register</button>
      </form>
      <p style={{ marginTop: "10px", textAlign: "center" }}>
        Already have an account? <a href="/login">Login</a>
      </p>
    </div>
  );
}
