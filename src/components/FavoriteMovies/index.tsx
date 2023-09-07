import { Box, Text } from "@chakra-ui/react";
import { FavoriteMovie } from "../../App";

export function FavoriteMovies({
  favoriteMovies,
}: {
  favoriteMovies: FavoriteMovie[];
}) {
  const countOfMovies = favoriteMovies.length;
  if (!countOfMovies) return null;
  return (
    <>
      <Text size="xl" fontWeight="bold">
        The list of favorite movies:
      </Text>
      {favoriteMovies.map(({ title, id }, index) => (
        <span key={id}>
          {title}
          {index < countOfMovies - 1 ? "," : "."}
        </span>
      ))}
    </>
  );
}
