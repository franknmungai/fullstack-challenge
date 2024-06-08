import { Book } from '../utils/types';

export interface AppState {
  books: Book[];
  currentPage: number; //for pagination
  readingList: Book[];
  filteredResults: Book[]; //list of titles (search results)
  currentBooksInview: Book[];
}

type ActionType =
  | {
      type: 'ADD_BOOKS';
      payload: Book[];
    }
  | { type: 'SET_PAGE'; payload: number }
  | { type: 'FILTER_RESULTS'; payload: string }
  | { type: 'CLEAR_RESULTS' };

export const initialState: AppState = {
  books: [],
  currentPage: 1, // 1:1-12; 2:13-24
  currentBooksInview: [],
  readingList: [],
  filteredResults: [],
};

export const reducer = (state: AppState, action: ActionType): AppState => {
  switch (action.type) {
    case 'ADD_BOOKS':
      return {
        ...state,
        books: action.payload,
      };
    case 'SET_PAGE':
      const newPage = action.payload; //eg 2
      const start = action.payload * 12; //24
      const end = start + 12; //36
      const currentBooksInview = state.books.filter(
        (_, i) => i + 1 >= start && i + 1 < end
      );

      return {
        ...state,
        currentPage: newPage,
        currentBooksInview,
      };

    case 'FILTER_RESULTS':
      return {
        ...state,
        filteredResults: state.books.filter((book) =>
          book.title.toLowerCase().startsWith(action.payload.toLowerCase())
        ),
      };

    case 'CLEAR_RESULTS':
      return {
        ...state,
        filteredResults: [],
      };
    default:
      return state;
  }
};
