import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import { MutationCache, QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import type { AppProps } from 'next/app'
import { useState } from 'react'
import { toast, Toaster } from 'react-hot-toast'
import { Provider } from 'react-redux'
import { AutoRefreshAuth } from 'src/auth/AutoRefreshAuth'
import { store } from 'src/redux/store'
import '../styles/globals.css'

function MyApp({ Component, pageProps }: AppProps) {
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
      <QueryClientProvider client={queryClient}>
        <AutoRefreshAuth>
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
        </AutoRefreshAuth>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </Provider>
  )
}

export default MyApp
