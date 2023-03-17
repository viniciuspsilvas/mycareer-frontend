import { Routes } from '@lib/common/route'
import { getEnv } from '@lib/Environment'
import axios from 'axios'
import NextAuth, { AuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

const endpoint: string = getEnv().NEXT_PUBLIC_API_URL

if (!process.env.NEXTAUTH_SECRET) {
  throw new Error('please provide process.env.NEXTAUTH_SECRET environment variable')
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
    async jwt({ token, user }) {
      return { ...token, ...user }
    },
    async session({ session, token, user }) {
      session.user = token as any
      return session
    }
  },
  pages: {
    signIn: Routes.authSignIn
  }
}
export default NextAuth(authOptions)
