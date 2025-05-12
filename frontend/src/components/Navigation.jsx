import { Link } from "react-router-dom";

export default function Navigation() {
  return (
    <nav style={{ marginBottom: 20 }}>
      <Link to="/" style={{ marginRight: 10 }}>Nowe zamówienie</Link>
      <Link to="/summary" style={{ marginRight: 10 }}>Podsumowanie dnia</Link>
      <Link to="/history">Historia zamówień</Link>
    </nav>
  );
} 