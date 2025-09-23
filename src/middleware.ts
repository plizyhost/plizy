import {NextRequest, NextResponse} from 'next/server';
import {i18n} from './lib/i18n-config';
import {match as matchLocale} from '@formatjs/intl-localematcher';
import Negotiator from 'negotiator';

function getLocale(request: NextRequest): string | undefined {
  const negotiatorHeaders: Record<string, string> = {};
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));

  const locales = i18n.locales;
  const languages = new Negotiator({headers: negotiatorHeaders}).languages();

  try {
    return matchLocale(languages, locales, i18n.defaultLocale);
  } catch (error) {
    // Return default locale if match fails
    return i18n.defaultLocale;
  }
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Skip middleware for API routes, static files, and special Next.js paths
  if (/^(\/api|_next\/static|_next\/image|images|favicon\.ico|robots\.txt|sitemap\.xml)/.test(pathname)) {
    return;
  }
  
  const pathnameIsMissingLocale = i18n.locales.every(
    locale => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );

  if (pathnameIsMissingLocale) {
    const locale = getLocale(request);

    return NextResponse.redirect(
      new URL(`/${locale}${pathname.startsWith('/') ? '' : '/'}${pathname}`, request.url)
    );
  }
}

export const config = {
  // Matcher ignoring `/_next/` and `/api/`
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|images).*)'],
};
