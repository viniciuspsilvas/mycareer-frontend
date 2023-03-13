import { MutationCache, QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import type { AppProps } from 'next/app'
import { useState } from 'react'
import { toast, Toaster } from 'react-hot-toast'
import '../styles/globals.css'
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'

function MyApp({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        queryCache: new QueryCache({
          onError: (error: any) => toast.error(`Something went wrong during the query: ${error.message as Error}`)
        }),
        mutationCache: new MutationCache({
          onError: (error: any) => toast.error(`Something went wrong during the mutation: ${error.message as Error}`)
        })
      })
  )

  return (
    <QueryClientProvider client={queryClient}>
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
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

export default MyApp
