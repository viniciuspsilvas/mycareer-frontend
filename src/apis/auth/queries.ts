import { getEnv } from '@lib/Environment'
import { useMutation } from '@tanstack/react-query'
import { gql, request } from 'graphql-request'

const endpoint: string = getEnv().NEXT_PUBLIC_API_URL

export const useLogin = () =>
  useMutation(({ email, password }: { email: string; password: string }) => login(email, password))

const login = async (email: string, password: string) =>
  await request(
    endpoint,
    gql`
      mutation Login($password: String!, $email: String!) {
        login(password: $password, email: $email) {
          user {
            id
            firstname
            lastname
          }
          accessToken
        }
      }
    `,
    { email, password }
  )
