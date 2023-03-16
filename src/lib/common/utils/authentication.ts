import { decode, JwtPayload } from 'jsonwebtoken'
import { getSession } from 'next-auth/react'

type JWTDecodeReturnType = JwtPayload & {}

export const isAuthenticated = async () => {
  const session = await getSession()
  const accessToken = session?.user.accessToken

  return !!accessToken
}

export const isValidAccessToken = async () => {
  const session = await getSession()
  const accessToken = session?.user.accessToken
  return !!accessToken && validateAccessToken(accessToken)
}
export const decodeAuthToken = (token: string) => decode(token) as JWTDecodeReturnType

export const validateAccessToken = (token: string) => {
  const expiry = token && decodeAuthToken(token)?.exp
  return expiry && expiry * 1000 >= Date.now()
}

// export const logout = () => {
//   const { clearAuthToken, clearAuthRoles, clearAuthUserId } = getState().user
//   clearAuthRoles()
//   clearAuthToken()
//   clearAuthUserId()
//   // window.location.reload()
// }
