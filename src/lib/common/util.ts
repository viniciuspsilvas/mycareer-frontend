import { getEnv } from '@lib/Environment'
import axios from 'axios'
import { Token } from 'graphql'
import { request, RequestDocument, Variables } from 'graphql-request'
import { merge } from 'lodash-es'
import { getSession, signIn } from 'next-auth/react'
import { AuthenticationTokenError } from './errors/errors'
import { isValidAccessToken } from './utils/authentication'

const env = getEnv()
export const protectedRequest = async <T = any, V = Variables>(
  operationName: string,
  document: RequestDocument,
  variables?: V,
  requestHeaders?: HeadersInit
): Promise<T> => {
  let resp = null

  const session = await getSession()
  const accessToken = session?.user.accessToken

  const isValidToken = await isValidAccessToken()
  try {
    if (!isValidToken) {
      await renewAccessToken()
    }

    const headers = accessToken ? merge({}, requestHeaders, { authorization: `Bearer ${accessToken}` }) : requestHeaders
    // TODO:
    // @ts-ignore: temporary ignore the typings
    resp = await request<T, V>(env.NEXT_PUBLIC_API_URL, document, variables, headers)
  } catch (error: any) {
    console.error(error)
    throw new Error(error)
  }

  return resp
}

const renewAccessToken = async () => {
  const session = await getSession()

  try {
    console.log('### renewAccessToken')

    /**
     * O problema que esta ocorrendo, eh porque o jid (refreshToken) nao esta sendo enviado
     * para o /refresh_token, 
     * Check se o jid fica salvo ao fazer login
     * Check como obter o jid e enviar no /refresh_toke
     * Talvez seja necessario incluir o refreshToken no retorno do Login function (UserResolver no backend)
     * 
     * Veja: https://www.youtube.com/watch?v=RPl0r-Yl6pU&ab_channel=SakuraDev
    
    SERVER CODE
    const token = req.cookies.jid
   
    */
    // Get the new access token
    const { data } = await axios.post('/refresh_token', {
      // refresh: session?.user.refreshToken //  Acho que pode remover isso, pois o refreshToken nao eh salvo na sessao
    })

    // Save the new token to client state
    if (session) session.user.accessToken = data.accessToken
    else signIn()
  } catch (error) {
    console.error(error)
    throw new AuthenticationTokenError()
  }
}
