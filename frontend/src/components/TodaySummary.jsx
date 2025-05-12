import { useEffect, useState } from "react";

export default function TodaySummary() {
  const [summary, setSummary] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/orders/today")
      .then(res => res.json())
      .then(data => setSummary(data))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <h2>Podsumowanie dzisiejszych zamówień</h2>
      {loading ? (
        <div>Ładowanie...</div>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Produkt</th>
              <th>Ilość</th>
            </tr>
          </thead>
          <tbody>
            {summary.map(item => (
              <tr key={item.name}>
                <td>{item.name}</td>
                <td>{item.qty}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
} 