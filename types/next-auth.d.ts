import NextAuth from 'next-auth'
import { User } from 'src/generated/graphql'

declare module 'next-auth' {
  interface Session {
    user: User
  }
}
