import { getEnv } from '@lib/Environment'
import { request, RequestDocument, Variables } from 'graphql-request'
import { merge } from 'lodash-es'
import { refreshToken } from 'src/apis/auth/queries'
import { authenticate } from 'src/redux/authenticationState'
import { store } from 'src/redux/store'
import { AuthenticationTokenError } from './errors/errors'
import { isValidAccessToken } from './utils/authentication'

export function getGraphqlRequestUrl(operationName?: string, variables?: Variables) {
  const env = getEnv()
  return operationName
    ? `${env.NEXT_PUBLIC_API_URL}?q=${operationName}&v=${JSON.stringify(variables)}`
    : env.NEXT_PUBLIC_API_URL
}

export const protectedRequest = async <T = any, V = Variables>(
  operationName: string,
  document: RequestDocument,
  variables?: V,
  requestHeaders?: HeadersInit
): Promise<T> => {
  let resp = null

  const accessToken = store.getState().authentication.accessToken

  try {
    if (!isValidAccessToken()) {
      await renewAccessToken()
    }

    const headers = accessToken ? merge({}, requestHeaders, { authorization: `Bearer ${accessToken}` }) : requestHeaders
    // TODO:
    // @ts-ignore: temporary ignore the typings
    resp = await request<T, V>(getGraphqlRequestUrl(operationName, variables), document, variables, headers)
  } catch (error: any) {
    console.error(error)
    throw new Error(error)
  }

  return resp
}

const renewAccessToken = async () => {
  try {
    console.log('### renewAccessToken')
    // Get the new access token
    const { accessToken, user } = await refreshToken()

    // Save the new token to client state
    store.dispatch(authenticate({ accessToken, user }))
  } catch (error) {
    console.error(error)
    throw new AuthenticationTokenError()
  }
}