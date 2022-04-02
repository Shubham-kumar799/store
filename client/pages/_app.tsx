import type { AppProps } from 'next/app';

//components
import { Navbar } from '@components/global';

//utils
import { Provider as ReduxProvider } from 'react-redux';
import { ApolloProvider } from '@apollo/client';
import { useApollo } from '@apolloLib/client';
import { ChakraProvider } from '@chakra-ui/react';
import { theme } from '@theme';
import { store } from '@store';
import { SetUser } from '@components/wrappers';

function MyApp({ Component, pageProps }: AppProps) {
  const apolloClient = useApollo(pageProps);
  return (
    <ReduxProvider store={store}>
      <ApolloProvider client={apolloClient}>
        <ChakraProvider theme={theme}>
          <SetUser>
            <Navbar />
            <Component {...pageProps} />
          </SetUser>
        </ChakraProvider>
      </ApolloProvider>
    </ReduxProvider>
  );
}

export default MyApp;