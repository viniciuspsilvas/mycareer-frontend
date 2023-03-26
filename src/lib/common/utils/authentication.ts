import { decode, JwtPayload } from 'jsonwebtoken'

type JWTDecodeReturnType = JwtPayload & {}

const decodeAuthToken = (token: string) => decode(token) as JWTDecodeReturnType

export const validateAccessToken = (token: string) => {
  const expiry = token && decodeAuthToken(token)?.exp
  return expiry && expiry * 1000 >= Date.now()
}
