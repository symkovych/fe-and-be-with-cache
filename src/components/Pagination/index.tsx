import { Box } from "@chakra-ui/react";
import PaginationComponent from "rc-pagination";
import "rc-pagination/assets/index.css";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { pageQueryKey, searchQueryKey } from "../../constans";
import { FetchParams } from "../../App";

type PaginationProps = {
  total: number;
  fetchSearch: (params: FetchParams) => void;
};

const pageSize = 20;

export function Pagination({ fetchSearch, ...props }: PaginationProps) {
  const [search, setSearchParams] = useSearchParams();
  const pageQuerValue = search.get(pageQueryKey);
  const [currentPage, setCurrentPage] = useState(
    parseInt(pageQuerValue ?? "1")
  );

  const handleOnChangePage = (page: number) => {
    setCurrentPage(page);
    fetchSearch({ page, query: search.get(searchQueryKey) ?? "" });
    window.scrollTo(0, 0);
    setSearchParams((prev) => {
      prev.set(pageQueryKey, page.toString());
      return prev;
    });
  };

  useEffect(() => {
    if (pageQuerValue) {
      setCurrentPage(+pageQuerValue);
    }
  }, [pageQuerValue]);

  if (!props?.total || props?.total <= pageSize) return null;
  return (
    <Box w="full" display="flex" justifyContent="center" padding="10">
      <PaginationComponent
        onChange={handleOnChangePage}
        current={currentPage}
        pageSize={pageSize}
        {...props}
      />
    </Box>
  );
}
