import { Book } from '../utils/types';

export interface AppState {
  books: Book[];
  currentPage: number; //for pagination
  readingList: Book[];
  filteredResults: Book[]; //list of titles (search results)
  currentBooksInview: Book[];
  showReadingList: boolean;
}

type ActionType =
  | {
      type: 'ADD_BOOKS';
      payload: Book[];
    }
  | { type: 'SET_PAGE'; payload: number }
  | { type: 'FILTER_RESULTS'; payload: string }
  | { type: 'CLEAR_RESULTS' }
  | { type: 'TOGGLE_READING_LIST'; payload: boolean }
  | { type: 'ADD_TO_READING_LIST'; payload: Book }
  | { type: 'REMOVE_FROM_READING_LIST'; payload: string };

export const initialState: AppState = {
  books: [],
  currentPage: 1, // 1:1-12; 2:13-24
  currentBooksInview: [],
  readingList: [],
  filteredResults: [],
  showReadingList: false,
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
      const end = action.payload * 12; //24
      const start = end - 12; //36
      const currentBooksInview = state.books.filter(
        (book) => +book.id > start && +book.id <= end
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
    case 'TOGGLE_READING_LIST':
      return {
        ...state,
        showReadingList: action.payload,
      };
    case 'ADD_TO_READING_LIST':
      return {
        ...state,
        readingList: [action.payload, ...state.readingList],
      };
    case 'REMOVE_FROM_READING_LIST':
      return {
        ...state,
        readingList: state.readingList.filter(
          (book) => book.id !== action.payload
        ),
      };
    default:
      return state;
  }
};
