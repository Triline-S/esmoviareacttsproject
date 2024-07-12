//Mantine
import { Card, Image, Text, Badge, Group } from "@mantine/core";

export const CCard = ({movie}) => {

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder className="mt-2">
      <Card.Section>
        <Image className="h-48 md:h-auto hover:scale-105 transition-all"
          src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2${movie.poster_path}`}
          alt={movie.title}
        />
      </Card.Section>

      <Group justify="space-between" mt="md" mb="xs">
        <Text fw={500}>{movie.title}</Text>
        <Badge color="purple">{movie.original_title}</Badge>
      </Group>
      <Text size="sm" c="dimmed">
        {movie.overview.slice(0, 170)}...
      </Text>
    </Card>
  );
};
