import { protectedRequest } from 'src/clients/graphqlClient'
import { getEnv } from '@lib/Environment'
import { useMutation, useQuery } from '@tanstack/react-query'
import { gql, request } from 'graphql-request'
import { User, UserInput } from 'src/generated/graphql'

const endpoint: string = getEnv().NEXT_PUBLIC_API_URL

const GET_ME = 'me'

export const useUpsertUser = () => {
  return useMutation((data: UserInput) => upsertUser(data), {
    onSuccess: (_, variables) => {
      console.log(`${variables.firstname} create successfully.`)
    }
  })
}

const upsertUser = async (data: UserInput) =>
  await request(
    endpoint,
    gql`
      mutation UpsertUser($data: UserInput!) {
        upsertUser(data: $data) {
          id
          firstname
          lastname
          mobile
          email
          role
        }
      }
    `,
    { data }
  )

export const useGetMe = () =>
  useQuery<User, Error>([GET_ME], async () => {
    const result = await protectedRequest(
      endpoint,
      gql`
        query Me {
          me {
            id
            firstname
            lastname
            mobile
            email
            role
          }
        }
      `
    )
    return result.me
  })
