import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import { resolveLocaleRedirectPath } from '@/lib/i18n/middleware-routing';

export const middleware = (request: NextRequest) => {
  const redirectPath = resolveLocaleRedirectPath(request.nextUrl.pathname);

  if (redirectPath) {
    return NextResponse.redirect(new URL(redirectPath, request.url));
  }

  return NextResponse.next();
};

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)'],
};
