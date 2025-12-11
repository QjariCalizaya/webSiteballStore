import React, { useEffect, useState } from "react";
import "../styles/profile.css";

function Profile() {
  const [user, setUser] = useState(null);

  // inputs
  const [newEmail, setNewEmail] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [emailStatus, setEmailStatus] = useState("");

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [passwordStatus, setPasswordStatus] = useState("");

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (!savedUser) {
      window.location.href = "/login";
      return;
    }
    setUser(JSON.parse(savedUser));
  }, []);

  async function updateEmail(e) {
    e.preventDefault();
    setEmailStatus("");

    const token = localStorage.getItem("token");

    const res = await fetch("http://localhost:3000/api/users/change-email", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token
      },
      body: JSON.stringify({
        newEmail,
        password: passwordConfirm
      })
    });

    const data = await res.json();
    setEmailStatus(data.error || data.message);

    if (!data.error) {
      const updatedUser = { ...user, email: newEmail };
      localStorage.setItem("user", JSON.stringify(updatedUser));
      setUser(updatedUser);
    }
  }

  async function updatePassword(e) {
    e.preventDefault();
    setPasswordStatus("");

    const token = localStorage.getItem("token");

    const res = await fetch("http://localhost:3000/api/users/change-password", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token
      },
      body: JSON.stringify({
        currentPassword,
        newPassword
      })
    });

    const data = await res.json();
    setPasswordStatus(data.error || data.message);
  }

  function handleLogout() {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    window.location.href = "/";
  }

  if (!user) return null;

  return (
    <div className="profile-container">
      <div className="profile-box">
        <h2>Профиль пользователя</h2>

        <div className="profile-item"><strong>Имя:</strong> {user.name}</div>
        <div className="profile-item"><strong>Email:</strong> {user.email}</div>
        <div className="profile-item"><strong>Роль:</strong> {user.role}</div>

        <button className="logout-btn" onClick={handleLogout}>Выйти</button>

        {/* Change Email */}
        <h3>Изменить Email</h3>
        <form onSubmit={updateEmail}>
          <input 
            type="email"
            placeholder="Новый email"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
            required
          />
          <input 
            type="password"
            placeholder="Введите текущий пароль"
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
            required
          />
          <button type="submit">Обновить Email</button>
          {emailStatus && <p className="status">{emailStatus}</p>}
        </form>

        {/* Change Password */}
        <h3>Изменить пароль</h3>
        <form onSubmit={updatePassword}>
          <input 
            type="password"
            placeholder="Текущий пароль"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            required
          />
          <input 
            type="password"
            placeholder="Новый пароль"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
          <button type="submit">Обновить пароль</button>
          {passwordStatus && <p className="status">{passwordStatus}</p>}
        </form>
        <a href="/">
        <button className="logout-btn"  >
            вернуться
        </button>
        </a>
      </div>
    </div>
  );
}

export default Profile;
