// middleware.ts
import { Routes } from '@lib/common/route'
import { getToken } from 'next-auth/jwt'
import { NextRequest, NextResponse } from 'next/server'
export async function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname
  const protectedPaths = [Routes.root, Routes.admin]
  const isPathProtected = protectedPaths?.some((path) => pathname == path)
  const res = NextResponse.next()
  if (isPathProtected) {
    const token = await getToken({ req })
    if (!token) {
      const url = new URL(Routes.authSignIn, req.url)
      url.searchParams.set('callbackUrl', pathname)
      return NextResponse.redirect(url)
    }
  }
  return res
}
