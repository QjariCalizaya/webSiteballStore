import React, { useEffect, useState } from "react";
import "../styles/orders.css";

function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "/login";
      return;
    }

    async function loadOrders() {
      const res = await fetch("http://localhost:3000/api/orders/my", {
        headers: {
          Authorization: "Bearer " + token
        }
      });

      const data = await res.json();
      setOrders(data);
    }

    loadOrders();
  }, []);

  return (
    <div className="orders-page">
      <button className="back-btn" onClick={() => window.history.back()}>
        ← Назад
      </button>

      <h2>Мои заказы</h2>

      {orders.length === 0 ? (
        <p>У вас пока нет заказов</p>
      ) : (
        <div className="orders-list">
          {orders.map(order => (
            <div key={order.id} className="order-card">
              <p><strong>Заказ №:</strong> {order.id}</p>
              <p><strong>Дата:</strong> {new Date(order.created_at).toLocaleString()}</p>
              <p><strong>Статус:</strong> {order.status}</p>
              <p><strong>Сумма:</strong> ${order.total_price}</p>

              {/* luego agregamos detalles */}
              <button className="details-btn" disabled>
                Подробнее
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Orders;
