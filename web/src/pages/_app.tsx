import type { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import theme from '../theme';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import Layout from '../components/Layout';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: 1
        }
    }
});

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <QueryClientProvider client={queryClient}>
            <ChakraProvider theme={theme}>
                <Layout>
                    <Component {...pageProps} />
                </Layout>
            </ChakraProvider>
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    );
}

export default MyApp;
