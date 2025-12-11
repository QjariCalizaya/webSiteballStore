import React, { useEffect, useState } from "react";
import { getCart, updateQuantity, removeFromCart } from "../utils/cart";
import "../styles/cart.css";





function Cart() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    setCart(getCart());
  }, []);

  function handleQuantityChange(id, qty) {
    updateQuantity(id, qty);
    setCart(getCart());
  }

  function handleRemove(id) {
    removeFromCart(id);
    setCart(getCart());
  }

  async function checkout() {
  const token = localStorage.getItem("token");
  if (!token) {
    alert("Вы должны войти в систему");
    window.location.href = "/login";
    return;
  }

  const items = cart.map(item => ({
    id: item.id,
    quantity: item.quantity
  }));

  const res = await fetch("http://localhost:3000/api/orders", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token
    },
    body: JSON.stringify({ items })
  });

  const data = await res.json();

  if (!res.ok) {
    alert("Ошибка: " + data.error);
    return;
  }

  // Vaciar carrito
  localStorage.removeItem("cart");

  alert("Заказ оформлен! Номер заказа: " + data.orderId);
  window.location.href = "/"; // regresar a inicio
}


  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (cart.length === 0)
    return <h2 className="empty">Корзина пуста</h2>;

  return (
    <div className="cart-page">
        <button className="back-btn" onClick={() => window.history.back()}>
        ← Назад
        </button>

      <h2>Корзина</h2>

      <div className="cart-box">
        {cart.map(item => (
          <div key={item.id} className="cart-item">

            {/* Imagen */}
            <img src={`http://localhost:3000${item.image_url}`} alt={item.name} />

            {/* Info */}
            <div className="cart-info">
              <h3>{item.name}</h3>
              <p>Цена: ${item.price}</p>

              <input 
                type="number"
                min="1"
                value={item.quantity}
                onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))}
              />

              <button onClick={() => handleRemove(item.id)}>
                Удалить
              </button>
            </div>

          </div>
        ))}
      </div>

      <h2 className="total">Итого: ${total}</h2>

      <button className="checkout-btn" onClick={checkout}>
        Оформить заказ
      </button>
    </div>
  );
}

export default Cart;
