import { useContext, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';
import { gql, useQuery } from '@apollo/client';

import { AppContext } from '../../context';
import BookList from '../BookList';
import SearchBar from '../SearchBar';
import CustomPagination from '../Pagination';
import CustomTabView from '../Tabs';
import illustration from '../../assets/no-books.svg';
import './webview.css';

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
    state: {
      filteredResults,
      currentBooksInview,
      currentPage,
      books,
      showReadingList,
      readingList,
    },
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
        <CircularProgress />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container">
        <h1>An error occured: Could not fetch the books</h1>
        <img src={illustration} width={300} alt="no books" />
      </div>
    );
  }

  return (
    <div className="container">
      {!showReadingList && (
        <Typography variant="body1" margin="0.5rem 0">
          Page {currentPage} of {Math.ceil(books.length / 12)}
        </Typography>
      )}
      <Stack
        // flexDirection="row"
        justifyContent="space-around"
        alignItems="center"
        width="100%"
        direction={{ xs: 'column-reverse', md: 'row' }}
        spacing={{ xs: 2, md: 4 }}
      >
        <SearchBar />
        <CustomTabView />
      </Stack>
      {showReadingList ? (
        <BookList books={readingList} showReadingList />
      ) : (
        <BookList
          books={
            filteredResults.length > 0 ? filteredResults : currentBooksInview
          }
        />
      )}
      {!showReadingList ? <CustomPagination /> : null}
    </div>
  );
};

export default WebView;
