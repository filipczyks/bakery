import { useState } from "react";
import { API_BASE_URL } from "../config";
import { TextInput, Textarea, Button, Paper, Title, Stack, Alert } from '@mantine/core';
import { IconAlertCircle } from '@tabler/icons-react';

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
        setMessage({ type: "success", text: "Zamówienie zostało złożone!" });
        setOrderText("");
        setClientName("");
      } else {
        const data = await res.json();
        setMessage({ type: "error", text: "Błąd: " + (data.error || "Nieznany błąd") });
      }
    } catch (err) {
      setMessage({ type: "error", text: err.message });
    }
  };

  return (
    <Paper shadow="sm" p="xl" radius="md" withBorder>
      <form onSubmit={handleSubmit}>
        <Stack>
          <Title order={2} ta="center" mb="md">Nowe zamówienie</Title>
          
          <TextInput
            label="Klient"
            value={clientName}
            onChange={(e) => setClientName(e.target.value)}
            required
          />

          <Textarea
            label="Zamówienie (każda pozycja w nowej linii)"
            value={orderText}
            onChange={(e) => setOrderText(e.target.value)}
            required
            minRows={10}
            autosize
          />

          <Button type="submit" fullWidth mt="md">
            Złóż zamówienie
          </Button>

          {message && (
            <Alert 
              color={message.type === "success" ? "green" : "red"}
              title={message.type === "success" ? "Sukces" : "Błąd"}
              icon={<IconAlertCircle />}
            >
              {message.text}
            </Alert>
          )}
        </Stack>
      </form>
    </Paper>
  );
} 