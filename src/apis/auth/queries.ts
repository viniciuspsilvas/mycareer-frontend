import { getEnv } from '@lib/Environment'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { gql, request } from 'graphql-request'
import { User } from 'src/generated/graphql'

const endpoint: string = getEnv().NEXT_PUBLIC_API_URL

// TODO: move it to a global place
const api = axios.create({
  baseURL: endpoint,
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true
})

/* Login user hook */
export const useLogin = () =>
  useMutation(({ email, password }: { email: string; password: string }) => login(email, password))

const login = async (email: string, password: string) => {
  const result = await request<{ login: User }>(
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

  return result.login
}

/* Logout user hook */
export const useLogout = () => useMutation(() => logout())

const logout = async () =>
  await request(
    endpoint,
    gql`
      mutation Mutation {
        logout
      }
    `
  )
