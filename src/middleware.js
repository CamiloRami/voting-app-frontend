import { NextResponse } from 'next/server'

export function middleware(request) {
  const isAdminPage = request.nextUrl.pathname.startsWith('/admin')
  const isLoginPage = request.nextUrl.pathname === '/admin/login'
  const token = request.cookies.get('token')
  console.log('Token:', token)

  if (isAdminPage) {
    if (!token && !isLoginPage) {
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }
    if (token && isLoginPage) {
      return NextResponse.redirect(new URL('/admin', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: '/admin/:path*'
}