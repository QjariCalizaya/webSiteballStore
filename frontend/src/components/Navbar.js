import React, { useEffect, useState } from "react";
import "./Navbar.css";

function Navbar() {

  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  function handleLogout() {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    window.location.reload();
  }

  return (
    <nav className="navbar">
      <div className="nav-content">

        {/* LEFT */}
        <div className="nav-left">
          <input type="text" className="search" placeholder="Search" />
        </div>

        {/* RIGHT */}
        <div className="nav-right">

          {/* 🔥 Condición: si NO hay usuario */}
          {!user && (
            <>
              <a href="/login">Войти</a>
              <a href="/register">Регистрация</a>
            </>
          )}

          {/* 🔥 Condición: si SÍ hay usuario */}
          {user && (
            <>
              <a className="username" href="/profile">
                {user.name}
              </a>

              <button className="logout-btn" onClick={handleLogout}>
                Выйти
              </button>
            </>
          )}

          <a href="/orders">Заказы</a>
          <a href="/cart">Корзина</a>
          <a href="/project">О проекте</a>
          <div className="menu-icon">☰</div>
        </div>

      </div>
    </nav>
  );
}

export default Navbar;
