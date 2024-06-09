import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { ThemeProvider } from '@mui/material';
import WebView from './components/WebView';
import theme from './utils/theme';
import AppContextProvider from './context';
import { Toaster } from 'react-hot-toast';

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
          <Toaster />
        </AppContextProvider>
      </ThemeProvider>
    </ApolloProvider>
  );
}

export default App;
