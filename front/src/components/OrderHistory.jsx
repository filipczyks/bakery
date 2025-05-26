import { useEffect, useState } from "react";
import { API_URL } from "../config";
import { Paper, Title, Text, Stack, Card, Group, List, Loader, Center, Container } from '@mantine/core';

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
    fetch(`${API_URL}/orders/history`)
      .then(res => res.json())
      .then(data => setOrders(data))
      .finally(() => setLoading(false));
  }, []);

  return (
    <Container size="lg">
      <Paper shadow="sm" p="xl" radius="md" withBorder>
        <Stack>
          <Title order={2} ta="center" mb="xl">Historia zamówień</Title>
          
          {loading ? (
            <Center>
              <Loader size="lg" />
            </Center>
          ) : (
            <Stack>
              {orders.length === 0 && (
                <Text c="dimmed" ta="center" size="lg">Brak zamówień.</Text>
              )}
              
              {orders.map((order, idx) => (
                <Card key={idx} shadow="sm" padding="lg" radius="md" withBorder>
                  <Stack>
                    <Group>
                      <Text fw={500}>Klient:</Text>
                      <Text>{order.clientName}</Text>
                    </Group>
                    
                    <Group>
                      <Text fw={500}>Data:</Text>
                      <Text>{formatDate(order.createdAt)}</Text>
                    </Group>
                    
                    <div>
                      <Text fw={500} mb="xs">Oryginalne zamówienie:</Text>
                      <Paper p="xs" bg="gray.0" withBorder>
                        <Text style={{ whiteSpace: 'pre-wrap' }}>{order.rawOrderText}</Text>
                      </Paper>
                    </div>
                    
                    <div>
                      <Text fw={500} mb="xs">Pozycje:</Text>
                      <List spacing="xs">
                        {order.items.map((item, i) => (
                          <List.Item key={i}>
                            {item.name} x {item.qty}
                          </List.Item>
                        ))}
                      </List>
                    </div>
                  </Stack>
                </Card>
              ))}
            </Stack>
          )}
        </Stack>
      </Paper>
    </Container>
  );
} 