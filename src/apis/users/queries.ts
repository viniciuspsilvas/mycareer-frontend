import { getEnv } from '@lib/Environment'
import { useMutation } from '@tanstack/react-query'
import { gql, request } from 'graphql-request'
import { UserInput } from 'src/generated/graphql'

const endpoint: string = getEnv().NEXT_PUBLIC_API_URL

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
        }
      }
    `,
    { data }
  )
