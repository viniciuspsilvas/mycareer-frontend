import { protectedRequest } from '@lib/common/graphqlClient'
import { getEnv } from '@lib/Environment'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { gql } from 'graphql-request'
import { Award, AwardInput } from 'src/generated/graphql'

const GET_AWARD = 'award'
const ALL_AWARDS = 'awards'

const endpoint: string = getEnv().NEXT_PUBLIC_API_URL

export const useAwards = () => {
  return useQuery<Award[], Error>([ALL_AWARDS], async () => {
    const result = await protectedRequest<{ awards: Award[] }>(
      endpoint,
      gql`
        query Awards {
          awards {
            id
            createdAt
            updatedAt
            title
            description
            grantedAt
          }
        }
      `
    )
    return result.awards
  })
}

export const useAwardById = ({ id }: { id: string }) => {
  return useQuery<Award, Error>(
    [GET_AWARD, id],
    async () => {
      const result = await protectedRequest(
        endpoint,
        gql`
          query AwardById($id: String!) {
            awardById(id: $id) {
              id
              title
              description
              grantedAt
              createdAt
              updatedAt
            }
          }
        `,
        { id }
      )
      return result.awardById
    },
    {
      enabled: !!id
    }
  )
}

export const useUpsertAward = () => {
  const queryClient = useQueryClient()

  // Use the same createQuery for create and update
  return useMutation((data: AwardInput) => upsertAward(data), {
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: [ALL_AWARDS] })
    },
    // TODO: check it out 🚀 only server errors will go to the Error Boundary
    useErrorBoundary: (error: any) => error.response?.status >= 500
  })
}

const upsertAward = async (data: AwardInput) =>
  await protectedRequest(
    endpoint,
    gql`
      mutation upsertAward($data: AwardInput!) {
        upsertAward(data: $data) {
          id
          title
          description
          grantedAt
          createdAt
          updatedAt
        }
      }
    `,
    { data }
  )

export const useDeleteAward = () => {
  const queryClient = useQueryClient()
  return useMutation(({ id }: { id: string }) => deleteAward(id), {
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: [ALL_AWARDS] })
    }
  })
}

const deleteAward = async (id: string) =>
  await protectedRequest(
    endpoint,
    gql`
      mutation DeleteAwardById($id: String!) {
        deleteAwardById(id: $id) {
          id
          title
          description
          grantedAt
          createdAt
          updatedAt
        }
      }
    `,
    { id }
  )
