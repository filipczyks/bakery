import { useState } from "react";
import { API_BASE_URL } from "../config";

export default function OrderForm() {
  const [clientName, setClientName] = useState("");
  const [orderText, setOrderText] = useState("");
  const [message, setMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);
    try {
      const res = await fetch(`${API_BASE_URL}/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ clientName, orderText }),
      });
      console.log(res);
      if (res.ok) {
        setMessage("Zamówienie zostało złożone!");
        setOrderText("");
        setClientName("");
      } else {
        const data = await res.json();
        setMessage("Błąd: " + (data.error || "Nieznany błąd"));
      }
    } catch (err) {
      setMessage(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Nowe zamówienie</h2>
      <div>
        <label>Imię i nazwisko klienta:</label>
        <input value={clientName} onChange={e => setClientName(e.target.value)} required />
      </div>
      <div>
        <label>Zamówienie (każda pozycja w nowej linii):</label>
        <textarea value={orderText} onChange={e => setOrderText(e.target.value)} required rows={5} />
      </div>
      <button type="submit">Złóż zamówienie</button>
      {message && <div>{message}</div>}
    </form>
  );
} 