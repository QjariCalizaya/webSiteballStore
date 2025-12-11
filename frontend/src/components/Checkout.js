import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Checkout() {
  const [product, setProduct] = useState(null);
  const [card, setCard] = useState('');
  const [name, setName] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const data = localStorage.getItem('checkoutProduct');
    if (!data) {
      navigate('/products');
      return;
    }
    setProduct(JSON.parse(data));
  }, [navigate]);

  const handlePay = (e) => {
    e.preventDefault();
    setSuccess(true);
  };

  if (!product) return null;

  return (
    <div className="container">
      <header>
        <h1>Checkout</h1>
      </header>
      <h2>{product.name}</h2>
      <p>Precio: {product.price}€</p>

      {success ? (
        <p style={{ color: 'green' }}>¡Pago simulado exitoso!</p>
      ) : (
        <form onSubmit={handlePay} className="form">
          <input placeholder="Nombre en la tarjeta" value={name} onChange={e => setName(e.target.value)} required />
          <input placeholder="Número de tarjeta" value={card} onChange={e => setCard(e.target.value)} required />
          <button type="submit">Pagar</button>
        </form>
      )}
    </div>
  );
}

export default Checkout;
