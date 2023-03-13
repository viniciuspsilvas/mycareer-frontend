import { getEnv } from '@lib/Environment'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { gql, request } from 'graphql-request'
import { Award, AwardCreateInput, AwardUpdateInput, AwardWhereUniqueInput } from 'src/generated/graphql'

const GET_AWARD = 'award'
const ALL_AWARDS = 'awards'

const endpoint: string = getEnv().NEXT_PUBLIC_API_URL

export const useAwards = () => {
  return useQuery<Award[], Error>([ALL_AWARDS], async () => {
    const result = await request(
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

export const useGetAward = ({ id }: { id: string }) => {
  const where: AwardWhereUniqueInput = {
    id
  }

  return useQuery<Award, Error>(
    [GET_AWARD],
    async () => {
      const result = await request(
        endpoint,
        gql`
          query Award($where: AwardWhereUniqueInput!) {
            award(where: $where) {
              id
              createdAt
              updatedAt
              title
              description
              grantedAt
            }
          }
        `,
        { where }
      )
      return result.award
    },
    {
      enabled: !!id
    }
  )
}

export const useCreateOneAward = () => {
  const queryClient = useQueryClient()

  // Use the same createQuery for create and update
  return useMutation((data: AwardCreateInput) => createOneAward(data), {
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: [ALL_AWARDS] })
    },
    // TODO: check it out 🚀 only server errors will go to the Error Boundary
    useErrorBoundary: (error: any) => error.response?.status >= 500
  })
}

const createOneAward = async (data: AwardCreateInput) =>
  await request(
    endpoint,
    gql`
      mutation createOneAward($data: AwardCreateInput!) {
        createOneAward(data: $data) {
          id
        }
      }
    `,
    { data }
  )

export const useUpdateOneAward = () => {
  const queryClient = useQueryClient()
  return useMutation((data: AwardUpdateInput) => updateOneAward(data), {
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: [ALL_AWARDS] })
    }
  })
}

const updateOneAward = async (data: AwardUpdateInput) =>
  await request(
    endpoint,
    gql`
      mutation updateOneAward($data: AwardUpdateInput!, $where: AwardWhereUniqueInput!) {
        updateOneAward(data: $data, where: $where) {
          id
        }
      }
    `,
    { data, where: { id: data.id } }
  )

export const useDeleteOneAward = () => {
  const queryClient = useQueryClient()
  return useMutation((where: AwardWhereUniqueInput) => deleteOneAward(where), {
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: [ALL_AWARDS] })
    }
  })
}

const deleteOneAward = async (where: AwardWhereUniqueInput) =>
  await request(
    endpoint,
    gql`
      mutation deleteOneAward($where: AwardWhereUniqueInput!) {
        deleteOneAward(where: $where) {
          id
        }
      }
    `,
    { where }
  )
