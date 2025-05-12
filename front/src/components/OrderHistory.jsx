import { useEffect, useState } from "react";
import { API_BASE_URL } from "../config";

const formatDate = (dateString) => {
  const date = new Date(dateString);
  if (isNaN(date.getTime())) {
    return "Nieprawidłowa data";
  }
  return date.toLocaleString('pl-PL', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  });
};

export default function OrderHistory() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE_URL}/orders/history`)
      .then(res => res.json())
      .then(data => setOrders(data))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <h2>Historia zamówień</h2>
      {loading ? (
        <div>Ładowanie...</div>
      ) : (
        <div>
          {orders.length === 0 && <div>Brak zamówień.</div>}
          {orders.map((order, idx) => (
            <div key={idx} style={{ border: "1px solid #ccc", margin: "10px 0", padding: 10 }}>
              <div><b>Klient:</b> {order.clientName}</div>
              <div><b>Data:</b> {formatDate(order.createdAt)}</div>
              <div><b>Oryginalne zamówienie:</b>
                <pre style={{ background: "#f8f8f8", padding: 5 }}>{order.rawOrderText}</pre>
              </div>
              <div><b>Pozycje:</b>
                <ul>
                  {order.items.map((item, i) => (
                    <li key={i}>{item.name} x {item.qty}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 