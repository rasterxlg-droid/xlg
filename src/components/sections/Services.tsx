'use client';
import { useTranslations } from 'next-intl';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

export default function Services() {
  const t = useTranslations('services');
  const items = t.raw('items') as Array<{ num: string; icon: string; title: string; desc: string }>;
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  const scrollToContact = () => {
    const el = document.getElementById('contact');
    if (!el) return;
    window.scrollTo({ top: el.offsetTop - 88, behavior: 'smooth' });
  };

  return (
    <section id="services" style={{ padding: '100px 5%', background: 'var(--bg)' }} ref={ref}>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.65 }}
        style={{ marginBottom: 60 }}
      >
        <span style={{
          display: 'inline-block', fontSize: '0.75rem', fontWeight: 700,
          letterSpacing: '0.12em', textTransform: 'uppercase',
          color: 'var(--accent)', marginBottom: 12,
        }}>
          {t('tag')}
        </span>
        <h2 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(1.8rem, 4vw, 3rem)',
          fontWeight: 800, letterSpacing: '-0.04em',
          lineHeight: 1.1, color: 'var(--text)', marginBottom: 16,
          whiteSpace: 'pre-line',
        }}>
          {t('title')}
        </h2>
        <p style={{ fontSize: '1rem', color: 'var(--text-muted)', maxWidth: 480, fontWeight: 300 }}>
          {t('sub')}
        </p>
      </motion.div>

      {/* Cards grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: 20,
      }}>
        {items.map((item, i) => (
          <ServiceCard key={item.num} item={item} delay={i * 0.1} inView={inView} onOrder={scrollToContact} orderText={t('order')} />
        ))}
      </div>
    </section>
  );
}

function ServiceCard({
  item, delay, inView, onOrder, orderText,
}: {
  item: { num: string; icon: string; title: string; desc: string };
  delay: number;
  inView: boolean;
  onOrder: () => void;
  orderText: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay }}
      whileHover={{ y: -6, boxShadow: '0 20px 60px rgba(0,0,0,0.4)' }}
      style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius)',
        padding: '40px 36px',
        position: 'relative',
        overflow: 'hidden',
        cursor: 'default',
        transition: 'border-color 0.3s, background 0.3s',
      }}
      onHoverStart={(e) => {
        const el = e.target as HTMLElement;
        const card = el.closest('[data-card]') as HTMLElement;
        if (card) {
          card.style.borderColor = 'rgba(200,245,66,0.2)';
          const overlay = card.querySelector('[data-overlay]') as HTMLElement;
          if (overlay) overlay.style.opacity = '1';
          const link = card.querySelector('[data-link]') as HTMLElement;
          if (link) { link.style.opacity = '1'; link.style.transform = 'translateY(0)'; }
        }
      }}
      onHoverEnd={(e) => {
        const el = e.target as HTMLElement;
        const card = el.closest('[data-card]') as HTMLElement;
        if (card) {
          card.style.borderColor = 'var(--border)';
          const overlay = card.querySelector('[data-overlay]') as HTMLElement;
          if (overlay) overlay.style.opacity = '0';
          const link = card.querySelector('[data-link]') as HTMLElement;
          if (link) { link.style.opacity = '0'; link.style.transform = 'translateY(4px)'; }
        }
      }}
      data-card=""
    >
      {/* Hover overlay */}
      <div data-overlay="" style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(135deg, var(--accent-dim) 0%, transparent 60%)',
        opacity: 0, transition: 'opacity 0.3s', pointerEvents: 'none',
      }} />

      {/* Icon */}
      <div style={{
        width: 52, height: 52, borderRadius: 12,
        background: 'var(--accent-dim)',
        border: '1px solid rgba(200,245,66,0.15)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        marginBottom: 28, fontSize: '1.4rem',
      }}>
        {item.icon}
      </div>

      {/* Big number */}
      <div style={{
        position: 'absolute', top: 32, right: 28,
        fontFamily: 'var(--font-display)',
        fontSize: '3.5rem', fontWeight: 800,
        color: 'rgba(255,255,255,0.03)',
        letterSpacing: '-0.04em', lineHeight: 1, pointerEvents: 'none',
      }}>
        {item.num}
      </div>

      <h3 style={{
        fontFamily: 'var(--font-display)',
        fontSize: '1.2rem', fontWeight: 700,
        letterSpacing: '-0.02em', color: 'var(--text)', marginBottom: 12,
      }}>
        {item.title}
      </h3>
      <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.7, fontWeight: 300 }}>
        {item.desc}
      </p>

      <button
        data-link=""
        onClick={onOrder}
        style={{
          display: 'inline-flex', alignItems: 'center', gap: 6,
          marginTop: 24, fontSize: '0.85rem', fontWeight: 600,
          color: 'var(--accent)', background: 'none', border: 'none', cursor: 'pointer',
          fontFamily: 'var(--font-body)',
          opacity: 0, transform: 'translateY(4px)', transition: 'all 0.2s',
        }}
      >
        {orderText}
      </button>
    </motion.div>
  );
}
