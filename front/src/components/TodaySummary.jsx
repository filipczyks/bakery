import { useEffect, useState } from "react";
import { API_URL } from "../config";
import { Title, Table, Paper, Loader, Center, Stack, Container, Text } from '@mantine/core';

export default function TodaySummary() {
  const [summary, setSummary] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_URL}/orders/today`)
      .then(res => res.json())
      .then(data => setSummary(data))
      .finally(() => setLoading(false));
  }, []);

  return (
    <Container size="md">
      <Paper shadow="sm" p="xl" radius="md" withBorder>
        <Stack>
          <Title order={2} ta="center" mb="xl">Podsumowanie dzisiejszych zamówień</Title>
          
          {loading ? (
            <Center>
              <Loader size="lg" />
            </Center>
          ) : (
            <>
              {summary.length === 0 ? (
                <Text c="dimmed" ta="center" size="lg">Brak zamówień na dziś.</Text>
              ) : (
                <Table striped highlightOnHover>
                  <Table.Thead>
                    <Table.Tr>
                      <Table.Th>Produkt</Table.Th>
                      <Table.Th ta="right">Ilość</Table.Th>
                    </Table.Tr>
                  </Table.Thead>
                  <Table.Tbody>
                    {summary.map(item => (
                      <Table.Tr key={item.name}>
                        <Table.Td>{item.name}</Table.Td>
                        <Table.Td ta="right">{item.qty}</Table.Td>
                      </Table.Tr>
                    ))}
                  </Table.Tbody>
                </Table>
              )}
            </>
          )}
        </Stack>
      </Paper>
    </Container>
  );
} 