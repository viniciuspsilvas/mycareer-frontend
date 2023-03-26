import { getEnv } from '@lib/Environment'
import { request, RequestDocument, Variables } from 'graphql-request'
import { merge } from 'lodash-es'
import { getSession } from 'next-auth/react'

const env = getEnv()
export const protectedRequest = async <T = any, V = Variables>(
  operationName: string,
  document: RequestDocument,
  variables?: V,
  requestHeaders?: HeadersInit
): Promise<T> => {
  let resp = null

  const session = await getSession()
  const accessToken = session?.user?.accessToken

  try {
    const headers = accessToken ? merge({}, requestHeaders, { authorization: `Bearer ${accessToken}` }) : requestHeaders
    // @ts-ignore: temporary ignore the typings
    resp = await request<T, V>(env.NEXT_PUBLIC_API_URL, document, variables, headers)
  } catch (error: any) {
    console.error(error)
    throw new Error(error)
  }

  return resp
}
