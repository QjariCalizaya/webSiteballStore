import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { login } from '../api';

function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await login({ username, password });
      localStorage.setItem('token', res.data.token);
      navigate('/products');
    } catch (err) {
      setError(err.response?.data?.error || 'Error al iniciar sesión');
    }
  };

  return (
    <div className="container">
      <header>
        <h1>MiBalon - Login</h1>
      </header>
      <form onSubmit={handleSubmit} className="form">
        <input placeholder="Usuario" value={username} onChange={e => setUsername(e.target.value)} required />
        <input type="password" placeholder="Contraseña" value={password} onChange={e => setPassword(e.target.value)} required />
        <button type="submit">Entrar</button>
      </form>
      <p style={{ color: 'red' }}>{error}</p>
      <p>¿No tienes cuenta? <Link to="/register">Registrarse</Link></p>
    </div>
  );
}

export default Login;
