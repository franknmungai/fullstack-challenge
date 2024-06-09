import React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { Book } from '../../utils/types';
import BookCard from '../BookCard';
import Illustration from '../../assets/no-books.svg';

type Props = {
  books: Book[];
  showReadingList?: boolean;
};

const BookList: React.FC<Props> = ({ books, showReadingList }) => {
  if (showReadingList && !books.length) {
    return (
      <Box
        padding={2}
        height="80vh"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        <img src={Illustration} alt="empty book list" width={300} />
        <Typography margin="2rem 0" variant="h5">
          No books on the reading list yet. Add a book and view your reading
          list here
        </Typography>
      </Box>
    );
  }

  return (
    <Grid container spacing={5}>
      {books.map((book) => (
        <Grid item lg={3} sm={12} sx={{ marginTop: '4rem' }} key={book.id}>
          {book.id}
          <BookCard book={book} />
        </Grid>
      ))}
    </Grid>
  );
};

export default BookList;
