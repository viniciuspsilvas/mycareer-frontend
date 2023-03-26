import { Routes } from '@lib/common/route'
import { validateAccessToken } from '@lib/common/utils/authentication'
import { getEnv } from '@lib/Environment'
import axios from 'axios'
import NextAuth, { AuthOptions } from 'next-auth'
import { JWT } from 'next-auth/jwt'
import CredentialsProvider from 'next-auth/providers/credentials'

const endpoint: string = getEnv().NEXT_PUBLIC_API_URL

if (!process.env.NEXTAUTH_SECRET) {
  throw new Error('please provide process.env.NEXTAUTH_SECRET environment variable')
}

const refreshAccessToken = async (token: JWT): Promise<JWT> => {
  const { refreshToken } = token
  const mutation = `
    mutation RefreshToken($refreshToken: String!) {
      refreshToken(refreshToken: $refreshToken) {
        id
        firstname
        lastname
        email
        accessToken
        refreshToken
      }
    }
  `
  const {
    data: { data }
  } = await axios.post(endpoint, {
    query: mutation,
    variables: { refreshToken },
    operationName: 'RefreshToken'
  })

  const user = data.refreshToken
  return Promise.resolve({ ...token, ...user })
}

export const authOptions: AuthOptions = {
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      id: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        if (!credentials) {
          throw new Error('No credentials.')
        }
        const { email, password } = credentials

        const mutation = `
          mutation Login($password: String!, $email: String!) {
            login(password: $password, email: $email) {
              id
              firstname
              lastname
              email
              accessToken
              refreshToken
            }
          }
        `
        const {
          data: { data }
        } = await axios.post(endpoint, {
          query: mutation,
          variables: { password, email },
          operationName: 'Login'
        })

        const user = data.login
        // If no error and we have user data, return it
        if (user) {
          return user
        }
        // Return null if user data could not be retrieved
        return null
      }
    })
  ],
  callbacks: {
    /**
This callback is called whenever a JSON Web Token is created or accessed by the client. 
Here is the right place to implement token rotation. 
The aim of refreshAccessToken function is to use the refresh token stored in our token object and use it to acquire a new access token with an updated expiration time. 
Be aware that our backend is providing us with expiration time in seconds and output from Date.now() is in milliseconds, that's why we need to divide it by 1000.
    */
    async jwt({ token, user }) {
      if (user) return { ...token, ...user }

      // on subsequent calls, token is provided and we need to check if it's expired
      if (validateAccessToken(token.accessToken)) {
        return { ...token }
      }
      //it the token has expired and has a refreshToken, it gets a new token
      else if (token?.refreshToken) {
        const newToken = await refreshAccessToken(token)
        return { ...newToken }
      }
      return { ...token }
    },
    async session({ session, token }) {
      session.user = token as any
      return session
    }
  },
  pages: {
    signIn: Routes.authSignIn
  }
}
export default NextAuth(authOptions)
