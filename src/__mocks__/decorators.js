import AuthProvider from "@lib/AuthProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const getQueryClient = () => {
  return new QueryClient({
    defaultOptions: {
      queries: {
        retry: false
      }
    },
  })
}

// Used as a provider for Storybook
const reactQueryProviderDecorator = storyFn => {
  return (
    <QueryClientProvider client={getQueryClient()}>
      {storyFn()}
    </QueryClientProvider>
  )
}

const nextAuthProviderDecorator = storyFn => {
  return (
    <AuthProvider >
      {storyFn()}
    </AuthProvider>
  )
}

export const decorators = [reactQueryProviderDecorator, nextAuthProviderDecorator]

// Used to wrap the unit tests (testing-library)
export const wrapper = ({ children }) => (
  <QueryClientProvider client={getQueryClient()}>{children}</QueryClientProvider>
)