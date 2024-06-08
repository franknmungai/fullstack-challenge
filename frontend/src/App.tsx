import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { ThemeProvider } from '@mui/material';
import './App.css';
import WebView from './components/WebView';
import theme from './utils/theme';
import AppContextProvider from './context';

function App() {
  const client = new ApolloClient({
    uri: 'http://localhost:4000/',
    cache: new InMemoryCache(),
  });

  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
        <AppContextProvider>
          <WebView />
        </AppContextProvider>
      </ThemeProvider>
    </ApolloProvider>
  );
}

export default App;
