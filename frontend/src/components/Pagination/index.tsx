import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { useContext } from 'react';
import { AppContext } from '../../context';

export default function CustomPagination() {
  const {
    state: { books },
    setPage,
    clearResults,
  } = useContext(AppContext);
  const paginationCount = 12;

  const numberOfPage = Math.ceil(books.length / paginationCount);

  const handleChange = (page: number) => {
    setPage(page);
    clearResults();

    document
      .querySelector('.container')
      ?.scrollIntoView({ behavior: 'smooth' });
  };
  return (
    <Stack spacing={2} margin={8}>
      <Pagination
        count={numberOfPage}
        variant="outlined"
        shape="rounded"
        color="secondary"
        onChange={(_, value) => handleChange(value)}
      />
    </Stack>
  );
}
