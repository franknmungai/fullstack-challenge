import { useContext, useEffect, useState } from 'react';
import { gql, useQuery } from '@apollo/client';
import CircularProgress from '@mui/material/CircularProgress';
import { AppContext } from '../../context';
import BookList from '../BookList';
import SearchBar from '../SearchBar';
import './webview.css';
import CustomPagination from '../Pagination';
import { Box, Stack, Tab, Tabs, Typography } from '@mui/material';

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
  const [tabValue, setTabValue] = useState('all_books');

  const isActive = (tab: 'all_books' | 'reading_list') => tab === tabValue;

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

  const activeTabStyles = {
    background: 'slateblue',
    color: 'white',
    borderRadius: '1rem',
  };

  return (
    <div className="container">
      <Typography variant="body1" margin="0.5rem 0">
        Page {currentPage} of {Math.ceil(books.length / 12)}
      </Typography>
      <Stack
        flexDirection="row"
        justifyContent="space-around"
        alignItems="center"
        width="100%"
      >
        <SearchBar />
        <Tabs
          sx={{ bgcolor: '#ededed', borderRadius: '1rem' }}
          onChange={(_, value) => setTabValue(value)}
        >
          <Tab
            value="all_books"
            label="All books"
            sx={isActive('all_books') ? activeTabStyles : {}}
          />
          <Tab
            value="reading_list"
            label="Reading List"
            sx={isActive('reading_list') ? activeTabStyles : {}}
          />
        </Tabs>
      </Stack>
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
