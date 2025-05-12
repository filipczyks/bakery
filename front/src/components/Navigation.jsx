import { Link } from "react-router-dom";
import { Group, Anchor, Paper } from '@mantine/core';

export default function Navigation() {
  return (
    <Paper shadow="sm" p="md" mb="xl">
      <Group>
        <Anchor component={Link} to="/">Nowe zamówienie</Anchor>
        <Anchor component={Link} to="/summary">Podsumowanie dnia</Anchor>
        <Anchor component={Link} to="/history">Historia zamówień</Anchor>
      </Group>
    </Paper>
  );
} 