'use client';
import { useTranslations } from 'next-intl';

export default function Footer() {
  const t = useTranslations('footer');
  return (
    <footer style={{
      padding: '32px 5%',
      borderTop: '1px solid var(--border)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
      gap: 16,
    }}>
      <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{t('rights')}</p>
      <div style={{ display: 'flex', gap: 24 }}>
        {[
          { label: t('privacy'), href: '#' },
          { label: t('kwork'), href: 'https://kwork.ru', external: true },
        ].map((link) => (
          <a
            key={link.label}
            href={link.href}
            target={link.external ? '_blank' : undefined}
            rel={link.external ? 'noopener noreferrer' : undefined}
            style={{ fontSize: '0.85rem', color: 'var(--text-muted)', textDecoration: 'none', transition: 'color 0.2s' }}
            onMouseEnter={e => (e.currentTarget.style.color = 'var(--text)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-muted)')}
          >
            {link.label}
          </a>
        ))}
      </div>
    </footer>
  );
}
