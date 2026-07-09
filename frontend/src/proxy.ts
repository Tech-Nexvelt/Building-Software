import { NextResponse, type NextRequest } from 'next/server';
import { updateSession } from '@/lib/supabase/middleware';

export async function proxy(request: NextRequest) {
  const { supabaseResponse, user } = await updateSession(request);

  const { pathname } = request.nextUrl;

  const isPublicRoute = pathname.startsWith('/login') || pathname.startsWith('/auth');

  let userToCheck = user;
  
  // Demo mock bypass check
  if (!user) {
    const demoCookie = request.cookies.get('nexvelt_demo_auth');
    if (demoCookie) {
      userToCheck = { id: 'mock-user', email: demoCookie.value } as any;
    }
  }

  // Protect all routes except public ones
  if (!userToCheck && !isPublicRoute) {
    const url = request.nextUrl.clone();
    url.pathname = '/login';
    url.searchParams.set('redirectTo', pathname);
    return NextResponse.redirect(url);
  }

  // Redirect to dashboard if logged in and trying to access login
  if (userToCheck && pathname === '/login') {
    const url = request.nextUrl.clone();
    url.pathname = '/dashboard';
    return NextResponse.redirect(url);
  }

  return supabaseResponse;
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
