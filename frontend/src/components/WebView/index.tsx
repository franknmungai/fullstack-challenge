import { useContext, useEffect } from 'react';
import { gql, useQuery } from '@apollo/client';
import CircularProgress from '@mui/material/CircularProgress';
import { AppContext } from '../../context';
import BookList from '../BookList';
import SearchBar from '../SearchBar';
import './webview.css';
import CustomPagination from '../Pagination';
import { Typography } from '@mui/material';

const WebView = () => {
  const GET_BOOKS = gql`
    query Books {
      books {
        id
        author
        title
        coverPhotoURL
        readingLevel
      }
    }
  `;

  const { loading, error, data } = useQuery(GET_BOOKS);
  const {
    addBooks,
    setPage,
    state: { filteredResults, currentBooksInview, currentPage, books },
  } = useContext(AppContext);

  useEffect(() => {
    if (data) {
      addBooks(data?.books);
      setPage(1);
    }
  }, [data, loading]);

  if (loading) {
    return (
      <div className="container">
        <CircularProgress size="" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container">
        <h1>An error occured: Could not fetch the books</h1>
      </div>
    );
  }

  return (
    <div className="container">
      <Typography variant="body1" margin="0.5rem 0">
        Page {currentPage} of {Math.ceil(books.length / 12)}
      </Typography>
      <SearchBar />
      <BookList
        books={
          filteredResults.length > 0 ? filteredResults : currentBooksInview
        }
      />

      <CustomPagination />
    </div>
  );
};

export default WebView;
