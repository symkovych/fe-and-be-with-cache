import { Box, Button, Input } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useDebouncedCallback } from "use-debounce";
import { pageQueryKey, searchQueryKey } from "../../constans";
import { FetchParams } from "../../App";

type SearchBarProps = {
  fetchSearch: (params: FetchParams) => void;
};

export function SearchBar({ fetchSearch }: SearchBarProps) {
  const [search, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(search.get(searchQueryKey) ?? "");

  const handleFetchSearch = ({ page, query }: FetchParams) => {
    fetchSearch({ page, query });
    setSearchParams((prev) => {
      prev.set(searchQueryKey, query);
      prev.set(pageQueryKey, "1");
      return prev;
    });
  };

  const debouncedFeatchSearch = useDebouncedCallback(handleFetchSearch, 300);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchText = e.target.value;
    setQuery(searchText);
    if (searchText.length > 2 || searchText.length === 0) {
      debouncedFeatchSearch({ page: 1, query });
    }
  };

  useEffect(() => {
    const keyDownHandler = (event: KeyboardEvent) => {
      if (event.key === "Enter") {
        event.preventDefault();
        handleFetchSearch({ page: 1, query });
      }
    };

    document.addEventListener("keydown", keyDownHandler);

    return () => {
      document.removeEventListener("keydown", keyDownHandler);
    };
  }, [handleFetchSearch]);

  return (
    <Box display="flex" gap="10" paddingY="40px">
      <Input
        backgroundColor="white"
        type="text"
        onChange={handleSearchChange}
        value={query}
      />
      <Button onClick={() => handleFetchSearch({ page: 1, query })}>
        Search
      </Button>
    </Box>
  );
}
