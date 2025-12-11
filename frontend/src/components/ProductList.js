import React, { useEffect, useState } from 'react';
import { getProducts } from '../api';
import { useNavigate } from 'react-router-dom';

function ProductList() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/');
      return;
    }

    getProducts()
      .then(res => setProducts(res.data))
      .catch(err => console.error(err));
  }, [navigate]);

  const handleBuy = (product) => {
    localStorage.setItem('checkoutProduct', JSON.stringify(product));
    navigate('/checkout');
  };

  return (
    <div className="container">
      <header>
        <h1>Каталог мячей МойМяч</h1>
      </header>
      <section className="product-list">
        {products.map(p => (
          <div key={p.id} className="product-card">
            <img src={p.image} alt={p.name} />
            <h3>{p.name}</h3>
            <p className="price">{p.price}€</p>
            <button className="buy-btn" onClick={() => handleBuy(p)}>Comprar</button>
          </div>
        ))}
      </section>
    </div>
  );
}

export default ProductList;
