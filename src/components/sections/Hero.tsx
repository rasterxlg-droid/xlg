'use client';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] },
});

export default function Hero() {
  const t = useTranslations('hero');

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    window.scrollTo({ top: el.offsetTop - 88, behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      style={{
        minHeight: '100vh',
        display: 'grid',
        placeItems: 'center',
        padding: '120px 5% 80px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background grid */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)',
        backgroundSize: '60px 60px',
        maskImage: 'radial-gradient(ellipse 80% 60% at 50% 40%, black 30%, transparent 80%)',
        pointerEvents: 'none',
      }} />

      {/* Glow */}
      <div style={{
        position: 'absolute',
        top: -200, left: '50%',
        transform: 'translateX(-50%)',
        width: 800, height: 800,
        background: 'radial-gradient(circle, rgba(200,245,66,0.06) 0%, transparent 65%)',
        pointerEvents: 'none',
      }} />

      <div style={{ position: 'relative', textAlign: 'center', maxWidth: 820 }}>
        {/* Badge */}
        <motion.div {...fadeUp(0)} style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          background: 'var(--accent-dim)',
          border: '1px solid rgba(200,245,66,0.2)',
          color: 'var(--accent)',
          fontSize: '0.8rem', fontWeight: 600,
          letterSpacing: '0.08em', textTransform: 'uppercase',
          padding: '6px 16px', borderRadius: '100px',
          marginBottom: 32,
        }}>
          <span style={{
            width: 6, height: 6, borderRadius: '50%',
            background: 'var(--accent)',
            animation: 'pulse 2s infinite',
            display: 'inline-block',
          }} />
          {t('badge')}
        </motion.div>

        {/* H1 */}
        <motion.h1 {...fadeUp(0.1)} style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(2.6rem, 7vw, 5.5rem)',
          fontWeight: 800,
          lineHeight: 1.05,
          letterSpacing: '-0.04em',
          color: 'var(--text)',
          marginBottom: 24,
        }}>
          {t('title1')}<br />{t('title2')}{' '}
          <span style={{ color: 'var(--accent)' }}>{t('titleAccent')}</span>
        </motion.h1>

        {/* Sub */}
        <motion.p {...fadeUp(0.2)} style={{
          fontSize: 'clamp(1rem, 2.5vw, 1.2rem)',
          color: 'var(--text-muted)',
          maxWidth: 560, margin: '0 auto 48px',
          fontWeight: 300,
        }}>
          {t('sub')}
        </motion.p>

        {/* CTA */}
        <motion.div {...fadeUp(0.3)} style={{
          display: 'flex', gap: 16,
          justifyContent: 'center', flexWrap: 'wrap',
        }}>
          <button
            onClick={() => scrollTo('contact')}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 10,
              padding: '14px 32px', borderRadius: '100px',
              background: 'var(--accent)', color: '#0a0a0f',
              fontWeight: 700, fontSize: '0.95rem', border: 'none', cursor: 'pointer',
              fontFamily: 'var(--font-body)',
              boxShadow: '0 0 30px var(--accent-glow)',
              transition: 'all 0.25s ease',
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 0 50px rgba(200,245,66,0.45)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '0 0 30px var(--accent-glow)'; }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
            {t('ctaPrimary')}
          </button>
          <button
            onClick={() => scrollTo('services')}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 10,
              padding: '14px 32px', borderRadius: '100px',
              background: 'transparent', color: 'var(--text)',
              fontWeight: 500, fontSize: '0.95rem',
              border: '1px solid var(--border)', cursor: 'pointer',
              fontFamily: 'var(--font-body)',
              transition: 'all 0.25s ease',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.transform = ''; }}
          >
            {t('ctaSecondary')}
          </button>
        </motion.div>

        {/* Stats */}
        <motion.div {...fadeUp(0.4)} style={{
          display: 'flex', justifyContent: 'center',
          gap: 'clamp(24px, 5vw, 48px)', marginTop: 72,
          flexWrap: 'wrap',
        }}>
          {[
            { num: t('stat1Num'), label: t('stat1Label') },
            { num: t('stat2Num'), label: t('stat2Label') },
            { num: t('stat3Num'), label: t('stat3Label') },
          ].map((s) => (
            <div key={s.label} style={{ textAlign: 'center' }}>
              <div style={{
                fontFamily: 'var(--font-display)',
                fontSize: '2rem', fontWeight: 800,
                color: 'var(--text)', letterSpacing: '-0.04em',
              }}>
                {s.num.replace(/(\d+)([^\d]*)/, (_, n, suf) => n)}
                <span style={{ color: 'var(--accent)' }}>
                  {s.num.replace(/^[\d]+/, '')}
                </span>
              </div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', letterSpacing: '0.04em' }}>
                {s.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
