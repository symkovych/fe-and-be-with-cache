import { Box, Button, Text } from "@chakra-ui/react";
import { memo } from "react";
import { Movie } from "../Cards";
import { FavoriteMovie } from "../../App";

const imageBaseURL = "http://image.tmdb.org/t/p/w500";

type CardItemProps = Movie & {
  isFavorite: boolean;
  addToFavoriteMovies: (movie: FavoriteMovie) => void;
  deleteFromFaviteMovies: (id: number) => void;
};

function CardItem({
  id,
  title,
  isFavorite,
  poster_path,
  overview,
  deleteFromFaviteMovies,
  addToFavoriteMovies,
}: CardItemProps) {
  const imageSrc = `${imageBaseURL}${poster_path}`;

  const handleOnClick = () => {
    if (isFavorite) {
      deleteFromFaviteMovies(id);
    } else {
      addToFavoriteMovies({ id, title });
    }
  };
  return (
    <Box
      borderRadius="xl"
      backgroundImage={`linear-gradient(to bottom, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.4)),url('${imageSrc}')`}
      backgroundPosition="center"
      backgroundRepeat="no-repeat"
      h="300px"
      display="flex"
      justifyContent="end"
      alignItems="center"
      flexDirection="column"
      backgroundSize="cover"
      position="relative"
      data-testid={id}
    >
      <Button
        position="absolute"
        top="3"
        right="3"
        colorScheme={isFavorite ? "red" : "blue"}
        onClick={handleOnClick}
      >
        {isFavorite ? "Added" : "Add"} to favorite
      </Button>

      <Box display="flex" flexDirection="column" gap="5" padding="0 10px">
        <Text textAlign="center" fontSize="xl" fontWeight="bold" color="white">
          {title}
        </Text>
        <Text
          noOfLines={2}
          color="gray.100"
          fontWeight="semibold"
          fontSize="sm"
          mb="2"
        >
          {overview}
        </Text>
      </Box>
    </Box>
  );
}

export default memo(CardItem);
