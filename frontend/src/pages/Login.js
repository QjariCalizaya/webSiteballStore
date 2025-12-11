import React, { useState } from "react";
import "../styles/auth.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleLogin(e) {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Ошибка входа");
        return;
      }

      // Guardar token y usuario
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      // Redirección por rol
      if (data.user.role === "admin") {
        window.location.href = "/admin";
      } else {
        window.location.href = "/";
      }

    } catch (err) {
      setError("Ошибка соединения с сервером");
    }
  }

  return (
    <div className="auth-container">
      <form className="auth-box" onSubmit={handleLogin}>
        <h2>Вход</h2>

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

        {error && <p className="auth-error">{error}</p>}

        <button type="submit">Войти</button>

        <p className="switch">
          Нет аккаунта? <a href="/register">Создать</a>
        </p>
      </form>
    </div>
  );
}

export default Login;
