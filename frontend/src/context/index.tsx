import { PropsWithChildren, createContext, useReducer } from 'react';
import { reducer, initialState, AppState } from './reducer';
import { Book } from '../utils/types';

interface ContextProps {
  state: AppState;
  setPage: (page: number) => void;
  addBooks: (books: Book[]) => void;
  filterResults: (title: string) => void;
  clearResults: () => void;
}
export const AppContext = createContext<ContextProps>({
  state: initialState,
  setPage: () => {},
  addBooks: () => {},
  filterResults: () => {},
  clearResults: () => {},
});

const AppContextProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const setPage = (page: number) => {
    dispatch({ type: 'SET_PAGE', payload: page });
  };

  const addBooks = (books: Book[]) => {
    dispatch({ type: 'ADD_BOOKS', payload: books });
  };

  const filterResults = (title: string) => {
    dispatch({ type: 'FILTER_RESULTS', payload: title });
  };
  const clearResults = () => {
    dispatch({ type: 'CLEAR_RESULTS' });
  };

  return (
    <AppContext.Provider
      value={{ state, setPage, addBooks, filterResults, clearResults }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;