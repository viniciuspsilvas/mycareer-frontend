import { decode, JwtPayload } from 'jsonwebtoken'
import { store } from 'src/redux/store'

type JWTDecodeReturnType = JwtPayload & {}

export const isAuthenticated = () => {
  const state = store.getState()
  return !!state.authentication?.accessToken
}

export const isValidAccessToken = () => {
  const accessToken = store.getState().authentication.accessToken
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
