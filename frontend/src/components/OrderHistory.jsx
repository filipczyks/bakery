import { useEffect, useState } from "react";

export default function OrderHistory() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/orders/history")
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
              <div><b>Data:</b> {new Date(order.createdAt).toLocaleString()}</div>
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