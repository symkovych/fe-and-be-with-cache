import { SimpleGrid, Text } from "@chakra-ui/react";
import CardItem from "../CardItem";
import { memo } from "react";
import { FavoriteMovie } from "../../App";

export type Movie = {
  adult: boolean;
  backdrop_path: string;
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};

type CardsProps = {
  cards: Movie[] | [];
  favoriteMovies: FavoriteMovie[];
  addToFavoriteMovies: (movie: FavoriteMovie) => void;
  deleteFromFaviteMovies: (id: number) => void;
};

function Cards({
  cards,
  favoriteMovies,
  addToFavoriteMovies,
  deleteFromFaviteMovies,
}: CardsProps) {
  if (!cards?.length) return <Text textAlign="center">There is no result</Text>;
  return (
    <SimpleGrid data-testid="cards" minChildWidth="400px" spacing="10" py="10">
      {cards.map((card) => (
        <CardItem
          key={card.id}
          isFavorite={!!favoriteMovies.find((movie) => movie.id === card.id)}
          addToFavoriteMovies={addToFavoriteMovies}
          deleteFromFaviteMovies={deleteFromFaviteMovies}
          {...card}
        />
      ))}
    </SimpleGrid>
  );
}

export default memo(Cards);
