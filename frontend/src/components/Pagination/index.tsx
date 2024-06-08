import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { useContext } from 'react';
import { AppContext } from '../../context';

export default function CustomPagination() {
  const {
    state: { books },
  } = useContext(AppContext);
  const paginationCount = 12;

  const numberOfPage = Math.ceil(books.length / paginationCount);
  return (
    <Stack spacing={2}>
      <Pagination count={numberOfPage} variant="outlined" shape="rounded" />
    </Stack>
  );
}
