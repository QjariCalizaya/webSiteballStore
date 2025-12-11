import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../styles/product.css";
import { addToCart } from "../utils/cart";


function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [added, setAdded] = useState(false);


  useEffect(() => {
    async function loadProduct() {
      const res = await fetch(`http://localhost:3000/api/products/${id}`);
      const data = await res.json();
      setProduct(data);
    }
    loadProduct();
  }, [id]);

  if (!product) return <p>Загрузка товара...</p>;

  return (
    <div className="product-page">

      {/* 🔙 Botón de volver */}
      <button className="back-btn" onClick={() => window.history.back()}>
        ← Назад
      </button>

      <div className="product-box">
        <div className="product-image">
          <img 
            src={`http://localhost:3000${product.image_url}`} 
            alt={product.name} 
          />
        </div>

        <div className="product-info">
            <h2>{product.name}</h2>

            <p className="description">{product.description}</p>

            <p className="price">Цена: ${product.price}</p>

            <p className="stock">
                В наличии: {product.stock} шт.
            </p>

            {!added ? (
            <button 
                className="add-to-cart"
                onClick={() => {
                addToCart(product);
                setAdded(true);
                }}
            >
                Добавить в корзину
            </button>
            ) : (
            <div className="after-add-buttons">
                <button 
                className="go-cart"
                onClick={() => (window.location.href = "/cart")}
                >
                Перейти в корзину
                </button>

                <button 
                className="continue"
                onClick={() => window.history.back()}
                >
                Продолжить покупки
                </button>
            </div>
            )}

        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
