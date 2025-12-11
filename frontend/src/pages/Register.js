import React, { useState } from "react";
import "../styles/auth.css";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("");

  async function handleRegister(e) {
    e.preventDefault();
    setStatus("");

    const res = await fetch("http://localhost:3000/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password })
    });

    const data = await res.json();

    if (!res.ok) {
      setStatus(data.error || "Ошибка регистрации");
      return;
    }

    setStatus("Аккаунт создан! Теперь можно войти.");
  }

  return (
    <div className="auth-container">
      <form className="auth-box" onSubmit={handleRegister}>
        <h2>Регистрация</h2>

        <input 
          type="text"
          placeholder="Имя"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input 
          type="email"
          placeholder="Электронная почта"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input 
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {status && <p className="auth-status">{status}</p>}

        <button type="submit">Создать аккаунт</button>

        <p className="switch">
          Уже есть аккаунт? <a href="/login">Войти</a>
        </p>
      </form>
    </div>
  );
}

export default Register;
