import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';

const locales = ['ru', 'en'];

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const isRu = locale === 'ru';
  return {
    title: 'XLGDEV — Разработка сайтов и digital-решений',
    description: isRu
      ? 'Профессиональная разработка сайтов, лендингов и веб-приложений. Быстро, качественно, с гарантией результата.'
      : 'Professional website, landing page and web app development. Fast, high quality, with guaranteed results.',
    openGraph: {
      type: 'website',
      locale: isRu ? 'ru_RU' : 'en_US',
      title: 'XLGDEV — Разработка сайтов и digital-решений',
      description: isRu
        ? 'Профессиональная разработка сайтов, лендингов и веб-приложений.'
        : 'Professional website and web app development.',
      url: process.env.NEXT_PUBLIC_SITE_URL,
    },
    twitter: {
      card: 'summary_large_image',
      title: 'XLGDEV — Разработка сайтов',
    },
  };
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  if (!locales.includes(locale)) notFound();

  const messages = await getMessages();

  return (
    <html lang={locale} style={{ scrollBehavior: 'smooth' }}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
