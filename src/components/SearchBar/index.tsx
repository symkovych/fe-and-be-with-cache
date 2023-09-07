import { Box, Button, Input } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useDebouncedCallback } from "use-debounce";

type SearchBarProps = {
  query: string;
  setQuery: (searchText: string) => void;
  fetchSearch: () => void;
};

export function SearchBar({ setQuery, query, fetchSearch }: SearchBarProps) {
  const debouncedFeatchSearch = useDebouncedCallback(fetchSearch, 300);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchText = e.target.value;
    setQuery(searchText);
    if (searchText.length > 2 || searchText.length === 0) {
      debouncedFeatchSearch();
    }
  };

  useEffect(() => {
    const keyDownHandler = (event: KeyboardEvent) => {
      if (event.key === "Enter") {
        event.preventDefault();
        fetchSearch();
      }
    };

    document.addEventListener("keydown", keyDownHandler);

    return () => {
      document.removeEventListener("keydown", keyDownHandler);
    };
  }, [fetchSearch]);

  return (
    <Box display="flex" gap="10" paddingY="40px">
      <Input
        backgroundColor="white"
        type="text"
        onChange={handleSearchChange}
        value={query}
      />
      <Button onClick={fetchSearch}>Search</Button>
    </Box>
  );
}
