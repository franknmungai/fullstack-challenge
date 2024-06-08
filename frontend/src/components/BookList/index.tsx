import React from 'react';
import { Grid } from '@mui/material';
import { Book } from '../../utils/types';
import BookCard from '../BookCard';

type Props = {
  books: Book[];
};

const BookList: React.FC<Props> = ({ books }) => {
  return (
    <Grid container spacing={5}>
      {books.map((book, i) => (
        <Grid item lg={3} sm={12} sx={{ marginTop: '4rem' }} key={i}>
          <BookCard book={book} />
        </Grid>
      ))}
    </Grid>
  );
};

export default BookList;
