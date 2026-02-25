import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Admin sayfaları için kontrol
  if (request.nextUrl.pathname.startsWith('/admin')) {
    // Login sayfasına izin ver
    if (request.nextUrl.pathname === '/admin/login' || request.nextUrl.pathname === '/admin') {
      return NextResponse.next();
    }
    
    // Diğer admin sayfaları için auth kontrolü (client-side)
    // Not: Gerçek projelerde server-side JWT kullanın
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};