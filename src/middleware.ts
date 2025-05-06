import {NextResponse} from 'next/server'
import type {NextRequest} from 'next/server'
import { getUserMeLoader } from '@/data/services/get-user-me-loader'


const protectedRoutes = ['/dashboard']


function isProtectedRoute(path: string): boolean {
  return protectedRoutes.some((route)=> path.startsWith(route))
}


export async function middleware(request: NextRequest){
  const user = await getUserMeLoader()
  console.log(user, 'user desde middleware');
  const currentPath = request.nextUrl.pathname

  if(isProtectedRoute(currentPath) && user.ok === false){
    return NextResponse.redirect(new URL('/login', request.url))
  }

  return NextResponse.next()
}


export const config = {
  matcher:[
    '/dashboard/:path*'
  ]
}