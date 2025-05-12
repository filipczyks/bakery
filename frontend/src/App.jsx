import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import OrderForm from "./components/OrderForm";
import TodaySummary from "./components/TodaySummary";
import OrderHistory from "./components/OrderHistory";

export default function App() {
  return (
    <BrowserRouter>
      <Navigation />
      <Routes>
        <Route path="/" element={<OrderForm />} />
        <Route path="/summary" element={<TodaySummary />} />
        <Route path="/history" element={<OrderHistory />} />
      </Routes>
    </BrowserRouter>
  );
} 