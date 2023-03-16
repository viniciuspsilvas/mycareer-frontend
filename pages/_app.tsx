import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import {
  DehydratedState,
  Hydrate,
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider
} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import AuthProvider from '@lib/AuthProvider'
import type { AppProps } from 'next/app'
import { useState } from 'react'
import { toast, Toaster } from 'react-hot-toast'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { persistor, store } from 'src/redux/store'
import '../styles/globals.css'

function MyApp({ Component, pageProps }: AppProps<{ dehydratedState: DehydratedState }>) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        // TODO: setup for development
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
            refetchOnReconnect: false,
            refetchOnMount: false,
            retry: 1,
            staleTime: 5 * 1000
          }
        },
        queryCache: new QueryCache({
          onError: (error: any) => toast.error(`Something went wrong during the query: ${error.message as Error}`)
        }),
        mutationCache: new MutationCache({
          onError: (error: any) => toast.error(`Something went wrong during the mutation: ${error.message as Error}`)
        })
      })
  )

  return (
    <Provider store={store}>
      <PersistGate loading={<>Loading redux state...</>} persistor={persistor}>
        <QueryClientProvider client={queryClient}>
          <Hydrate state={pageProps?.dehydratedState}>
            <AuthProvider>
              <Component {...pageProps} />
              <Toaster
                position="bottom-right"
                toastOptions={{
                  success: {
                    style: {
                      background: 'green',
                      color: '#fff'
                    }
                  },
                  error: {
                    style: {
                      background: 'red',
                      color: '#fff'
                    }
                  }
                }}
              />
            </AuthProvider>
          </Hydrate>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </PersistGate>
    </Provider>
  )
}

export default MyApp
