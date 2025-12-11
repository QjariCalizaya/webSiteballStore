import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { register } from '../api';

function Register() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await register({ username, email, password });
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.error || 'Error al registrarse');
    }
  };

  return (
    <div className="container">
      <header>
        <h1>МойМяч - Registro</h1>
      </header>
      <form onSubmit={handleSubmit} className="form">
        <input placeholder="Usuario" value={username} onChange={e => setUsername(e.target.value)} required />
        <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
        <input type="password" placeholder="Contraseña" value={password} onChange={e => setPassword(e.target.value)} required />
        <button type="submit">Registrarse</button>
      </form>
      <p style={{ color: 'red' }}>{error}</p>
      <p>¿Ya tienes cuenta? <Link to="/">Login</Link></p>
    </div>
  );
}

export default Register;
