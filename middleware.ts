// middleware.ts
import { Routes } from '@lib/common/route'
import { getToken } from 'next-auth/jwt'
import { NextRequest, NextResponse } from 'next/server'
import { UserRole } from 'src/generated/graphql'

export async function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname
  const protectedPaths = [Routes.root, Routes.admin, Routes.user, Routes.adminAwards]

  const isPathProtected = protectedPaths?.some((path) => pathname == path)
  const signInUrl = new URL(Routes.authSignIn, req.url)

  const res = NextResponse.next()
  if (isPathProtected) {
    // TODO: check if the token has expire
    const token = await getToken({ req })
    if (!token) {
      signInUrl.searchParams.set('callbackUrl', pathname)
      return NextResponse.redirect(signInUrl)
    }

    if (req.nextUrl.pathname.startsWith(Routes.admin) && token?.role !== UserRole.Admin)
      return NextResponse.rewrite(new URL(`${Routes.authSignIn}?message=You Are Not Authorized!`, req.url))
    if (req.nextUrl.pathname.startsWith(Routes.user) && token?.role !== UserRole.User)
      return NextResponse.rewrite(new URL(`${Routes.authSignIn}?message=You Are Not Authorized!`, req.url))
  }
  return res
}
