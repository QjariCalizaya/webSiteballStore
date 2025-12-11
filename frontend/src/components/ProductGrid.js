import React, { useEffect, useState } from "react";
import "./ProductGrid.css";

function ProductGrid() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/products")
      .then(res => res.json())
      .then(data => setProducts(data));
  }, []);

  return (
    <div className="products-section">
      <div className="filter">
        <button>Фильтр ▼</button>
      </div>

      <div className="grid">
        {products.map(product => (
          <div 
          key={product.id} 
          className="card"
          onClick={() => window.location.href = `/product/${product.id}`}
          style={{cursor: "pointer"}}
          >
            <img 
              src={`http://localhost:3000${product.image_url}`} 
              alt={product.name}
            />

            <h3>{product.name}</h3>
            <p>${product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductGrid;
