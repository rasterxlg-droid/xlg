'use client';
import { useTranslations, useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function Navbar() {
  const t = useTranslations('nav');
  const locale = useLocale();
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // С localePrefix: 'always' маршруты всегда /ru и /en
  const switchLocale = () => {
    const next = locale === 'ru' ? 'en' : 'ru';
    router.push(`/${next}`);
  };

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const nav = document.getElementById('navbar');
    const offset = (nav?.offsetHeight ?? 72) + 16;
    window.scrollTo({ top: el.offsetTop - offset, behavior: 'smooth' });
  };

  return (
    <motion.nav
      id="navbar"
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      style={{
        position: 'fixed',
        top: 0, left: 0, right: 0,
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: scrolled ? '14px 5%' : '20px 5%',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        background: 'rgba(10,10,15,0.85)',
        borderBottom: '1px solid var(--border)',
        transition: 'padding 0.3s',
      }}
    >
      <button
        onClick={() => scrollTo('hero')}
        style={{
          fontFamily: 'var(--font-display)',
          fontWeight: 800,
          fontSize: '1.2rem',
          letterSpacing: '-0.03em',
          color: 'var(--text)',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
        }}
      >
        XLG<span style={{ color: 'var(--accent)' }}>.</span>DEVELOPER
      </button>

      <ul style={{ display: 'flex', gap: 32, listStyle: 'none', alignItems: 'center' }}
          className="nav-links-desktop">
        {(['services', 'contact'] as const).map((id) => (
          <li key={id}>
            <button
              onClick={() => scrollTo(id)}
              style={{
                background: 'none', border: 'none', cursor: 'pointer',
                color: 'var(--text-muted)', fontSize: '0.9rem',
                fontWeight: 500, letterSpacing: '0.02em',
                fontFamily: 'var(--font-body)',
                transition: 'color 0.2s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
            >
              {t(id)}
            </button>
          </li>
        ))}
      </ul>

      <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
        {/* Locale switcher */}
        <button
          onClick={switchLocale}
          style={{
            background: 'var(--accent-dim)',
            border: '1px solid rgba(200,245,66,0.15)',
            color: 'var(--accent)',
            borderRadius: '100px',
            padding: '6px 14px',
            fontSize: '0.8rem',
            fontWeight: 700,
            cursor: 'pointer',
            letterSpacing: '0.06em',
            fontFamily: 'var(--font-body)',
            transition: 'all 0.2s',
          }}
          onMouseEnter={e => { e.currentTarget.style.background = 'rgba(200,245,66,0.2)'; }}
          onMouseLeave={e => { e.currentTarget.style.background = 'var(--accent-dim)'; }}
        >
          {locale === 'ru' ? 'EN' : 'RU'}
        </button>

        <button
          onClick={() => scrollTo('contact')}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '10px 22px',
            borderRadius: '100px',
            background: 'var(--accent)',
            color: '#0a0a0f',
            fontWeight: 700,
            fontSize: '0.85rem',
            border: 'none',
            cursor: 'pointer',
            fontFamily: 'var(--font-body)',
            boxShadow: '0 0 24px var(--accent-glow)',
            transition: 'all 0.25s',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 0 40px rgba(200,245,66,0.45)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = '';
            e.currentTarget.style.boxShadow = '0 0 24px var(--accent-glow)';
          }}
        >
          {t('cta')}
        </button>
      </div>

      <style>{`
        @media (max-width: 600px) { .nav-links-desktop { display: none !important; } }
      `}</style>
    </motion.nav>
  );
}
