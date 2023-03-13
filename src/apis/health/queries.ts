import { useQuery } from '@tanstack/react-query'
import { gql, request } from 'graphql-request'
import { getEnv } from '@lib/Environment'

const GET_HEALTH = 'health'

const endpoint: string = getEnv().NEXT_PUBLIC_API_URL

export const useHealth = () => {
  return useQuery<{ health: string }, Error>([GET_HEALTH], async () => {
    const result = await request(
      endpoint,
      gql`
        query Health {
          health
        }
      `
    )
    return result.health
  })
}
