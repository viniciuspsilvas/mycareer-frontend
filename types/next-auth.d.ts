import { User, UserRole } from 'src/generated/graphql'

declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as
   * a prop on the `SessionProvider` React Context
   */
  interface Session {
    user?: User
  }
}

declare module 'next-auth/jwt' {
  //   /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
    accessToken: string
    role: UserRole
  }
}
