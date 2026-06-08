import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  locales: ['ru', 'en'],
  defaultLocale: 'ru',
  // 'always' = /ru/... и /en/... — стабильно и предсказуемо
  localePrefix: 'always',
  localeDetection: false, // не полагаемся на Accept-Language браузера
});

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};
