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

function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const [search, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(search.get(searchQueryKey) ?? "");
  const [currentPage, setCurrentPage] = useState(
    parseInt(search.get(pageQueryKey) ?? "1")
  );
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

  const fetchMovies = async () => {
    if (!query) {
      setMovies([]);
      setTotal(0);
      return;
    }
    setLoading(true);
    try {
      const response = await fetch(
        `/fetchMovies?page=${currentPage}&query=${encodeURIComponent(query)}`
      );
      const { results, ...paginationData }: MovieResponseType =
        await response.json();
      setMovies(results);
      setTotal(paginationData.total_pages ?? 0);
      showToast(response.headers.has(CacheHitHeaderKey));
    } catch (e) {
      setError(`Error ${e}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies();
    window.scrollTo(0, 0);
  }, [currentPage]);

  useEffect(() => {
    setSearchParams((prev) => {
      prev.set(searchQueryKey, query);
      prev.set(pageQueryKey, currentPage.toString());
      return prev;
    });
  }, [query, currentPage, setSearchParams]);

  if (error) return <p>{error}</p>;

  return (
    <Box backgroundColor={"gray.300"} minH="100vh" padding="20px ">
      <SearchBar query={query} setQuery={setQuery} fetchSearch={fetchMovies} />
      <FavoriteMovies favoriteMovies={favoriteMovies} />
      <Cards
        cards={movies}
        favoriteMovies={favoriteMovies}
        addToFavoriteMovies={addToFavoriteMovies}
        deleteFromFaviteMovies={deleteFromFaviteMovies}
      />
      <Pagination
        total={total}
        current={currentPage}
        onChange={setCurrentPage}
      />
      {loading && <Loader />}
      <ToastContainer />
    </Box>
  );
}

export default App;
