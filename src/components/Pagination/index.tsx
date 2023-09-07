import { Box } from "@chakra-ui/react";
import PaginationComponent from "rc-pagination";
import "rc-pagination/assets/index.css";

type PaginationProps = {
  total: number;
  current: number;
  onChange: (page: number) => void;
};

export function Pagination(props: PaginationProps) {
  if (!props.total) return null;
  return (
    <Box w="full" display="flex" justifyContent="center" padding="10">
      <PaginationComponent {...props} />
    </Box>
  );
}
