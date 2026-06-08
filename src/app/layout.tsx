import { ReactNode } from 'react';
import { setRequestLocale } from 'next-intl/server';

export default function LocaleLayout({
  children,
  params: { locale }
}: {
  children: ReactNode;
  params: { locale: string };
}) {
  setRequestLocale(locale);

  return (
    <html lang={locale}>
      <body>{children}</body>
    </html>
  );
}