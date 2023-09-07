import { useCallback, useEffect, useState } from "react";
import Cards, { Movie } from "./components/Cards";
import { Box } from "@chakra-ui/react";
import { Loader } from "./components/svg-icons/Loader";
import { Pagination } from "./components/Pagination";
import { SearchBar } from "./components/SearchBar";
import { useSearchParams } from "react-router-dom";
import { FavoriteMovies } from "./components/FavoriteMovies";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CacheHitHeaderKey, pageQueryKey, searchQueryKey } from "./constans";

type MovieResponseType = {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
};

export type PaginationData = {
  page?: number;
  total_pages?: number;
  total_results?: number;
} | null;

export type FavoriteMovie = {
  id: number;
  title: string;
};

export type FetchParams = {
  page: number;
  query: string;
};

function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const [search] = useSearchParams();
  const [favoriteMovies, setFavrotieMovies] = useState<FavoriteMovie[]>([]);

  const addToFavoriteMovies = useCallback((favoriteMovie: FavoriteMovie) => {
    setFavrotieMovies((prev) => [...prev, favoriteMovie]);
  }, []);

  const deleteFromFaviteMovies = useCallback((id: number) => {
    setFavrotieMovies((prev) => prev.filter((movie) => movie.id !== id));
  }, []);

  const showToast = (isCacheHit: boolean) => {
    toast.info(
      isCacheHit
        ? "Response data comes from Cache"
        : "Response data comes from API",
      {
        position: toast.POSITION.BOTTOM_RIGHT,
      }
    );
  };

  const fetchMovies = async ({ page, query }: FetchParams) => {
    if (!query) {
      setMovies([]);
      setTotal(0);
      return;
    }
    setLoading(true);
    try {
      const response = await fetch(
        `/fetchMovies?page=${page}&query=${encodeURIComponent(query)}`
      );
      const { results, ...paginationData }: MovieResponseType =
        await response.json();
      setMovies(results);
      setTotal(paginationData.total_results ?? 0);
      showToast(response.headers.has(CacheHitHeaderKey));
    } catch (e) {
      setError(`Error ${e}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const pageParam = search.get(pageQueryKey);
    const queryParam = search.get(searchQueryKey);
    if (queryParam && pageParam) {
      fetchMovies({ page: +pageParam, query: queryParam });
    }
  }, []);

  if (error) return <p>{error}</p>;

  return (
    <Box backgroundColor={"gray.300"} minH="100vh" padding="20px ">
      <SearchBar fetchSearch={fetchMovies} />
      <FavoriteMovies favoriteMovies={favoriteMovies} />
      <Cards
        cards={movies}
        favoriteMovies={favoriteMovies}
        addToFavoriteMovies={addToFavoriteMovies}
        deleteFromFaviteMovies={deleteFromFaviteMovies}
      />
      <Pagination total={total} fetchSearch={fetchMovies} />
      {loading && <Loader />}
      <ToastContainer />
    </Box>
  );
}

export default App;
