import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useContext } from 'react';
import { AppContext } from '../../context';

export default function SearchBar() {
  const {
    state: { books },
    filterResults,
    clearResults,
  } = useContext(AppContext);

  const handleChange = (value: string) => {
    if (!value) {
      return clearResults();
    }
    filterResults(value);
  };

  return (
    <Autocomplete
      disablePortal
      id="combo-box-demo"
      options={books}
      getOptionLabel={(book) => `${book.title} - ${book.author}`}
      sx={{ width: 300 }}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Books"
          onChange={(e) => handleChange(e.target.value)}
        />
      )}
      onChange={(_, book) => {
        handleChange(book?.title || '');
      }}
    />
  );
}
