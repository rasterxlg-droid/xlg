'use client';
import { useTranslations, useLocale } from 'next-intl';
import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';

const WA_NUMBER = '77718721766';
const WA_HREF = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent('Привет! Хочу обсудить проект.')}`;

function formatPhone(value: string): string {
  let val = value.replace(/\D/g, '');
  if (val.startsWith('8')) val = '7' + val.slice(1);
  if (!val.startsWith('7') && val.length > 0) val = '7' + val;
  let fmt = '';
  if (val.length > 0)  fmt += '+' + val[0];
  if (val.length > 1)  fmt += ' (' + val.slice(1, 4);
  if (val.length >= 4) fmt += ') ' + val.slice(4, 7);
  if (val.length >= 7) fmt += '-' + val.slice(7, 9);
  if (val.length >= 9) fmt += '-' + val.slice(9, 11);
  return fmt;
}

export default function Contact() {
  const t = useTranslations('contact');
  const locale = useLocale();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    if (!name.trim()) { setError(t('validationName')); return; }
    if (phone.replace(/\D/g, '').length < 11) { setError(t('validationPhone')); return; }
    setError('');
    setLoading(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name.trim(), phone: phone.trim(), locale }),
      });
      if (!res.ok) throw new Error();
      setSent(true);
    } catch {
      setError(t('error'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" style={{ padding: '100px 5%', background: 'var(--bg)', position: 'relative' }} ref={ref}>
      {/* Bottom glow */}
      <div style={{
        position: 'absolute', bottom: 0, left: '50%',
        transform: 'translateX(-50%)',
        width: 600, height: 400,
        background: 'radial-gradient(circle, rgba(200,245,66,0.04) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: 60, alignItems: 'start',
      }}>
        {/* Info column */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65 }}
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
          <p style={{ fontSize: '1rem', color: 'var(--text-muted)', maxWidth: 480, fontWeight: 300, marginBottom: 32 }}>
            {t('sub')}
          </p>

          {[
            { icon: '📩', label: t('emailLabel'), value: 'rasterxlg@gmail.com' },
            { icon: '📱', label: t('phoneLabel'), value: '+7 (771) 872-17-66' },
            { icon: '🌐', label: t('kworkLabel'), value: 'kwork.ru/user/xlgdev' },
          ].map((item) => (
            <div key={item.label} style={{
              display: 'flex', alignItems: 'center', gap: 16,
              padding: '20px 0',
              borderBottom: '1px solid var(--border)',
            }}>
              <div style={{
                width: 40, height: 40, borderRadius: 10,
                background: 'var(--accent-dim)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '1rem', flexShrink: 0,
              }}>
                {item.icon}
              </div>
              <div>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem', marginBottom: 2 }}>{item.label}</div>
                <div style={{ color: 'var(--text)', fontWeight: 500 }}>{item.value}</div>
              </div>
            </div>
          ))}

          <a
            href={WA_HREF}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
              width: '100%', padding: '16px', marginTop: 24,
              background: '#25D366', color: '#fff',
              borderRadius: 12, fontWeight: 700, fontSize: '0.95rem',
              textDecoration: 'none', transition: 'all 0.25s',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = '#1ebe5d'; e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 10px 30px rgba(37,211,102,0.3)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = '#25D366'; e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = ''; }}
          >
            <WhatsAppIcon />
            {t('whatsapp')}
          </a>
        </motion.div>

        {/* Form column */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, delay: 0.15 }}
          style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius)',
            padding: '40px',
          }}
        >
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', fontWeight: 700, marginBottom: 8 }}>
            {t('formTitle')}
          </h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: 32 }}>
            {t('formSub')}
          </p>

          {!sent ? (
            <>
              <div style={{ marginBottom: 16 }}>
                <label style={{
                  display: 'block', fontSize: '0.8rem', fontWeight: 600,
                  letterSpacing: '0.04em', color: 'var(--text-muted)',
                  marginBottom: 8, textTransform: 'uppercase',
                }}>
                  {t('nameLabel')}
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder={t('namePlaceholder')}
                  style={inputStyle}
                  onFocus={e => { e.target.style.borderColor = 'rgba(200,245,66,0.4)'; e.target.style.background = 'rgba(200,245,66,0.04)'; }}
                  onBlur={e => { e.target.style.borderColor = 'var(--border)'; e.target.style.background = 'rgba(255,255,255,0.04)'; }}
                />
              </div>

              <div style={{ marginBottom: 16 }}>
                <label style={{
                  display: 'block', fontSize: '0.8rem', fontWeight: 600,
                  letterSpacing: '0.04em', color: 'var(--text-muted)',
                  marginBottom: 8, textTransform: 'uppercase',
                }}>
                  {t('phoneInputLabel')}
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={e => setPhone(formatPhone(e.target.value))}
                  placeholder={t('phonePlaceholder')}
                  style={inputStyle}
                  onFocus={e => { e.target.style.borderColor = 'rgba(200,245,66,0.4)'; e.target.style.background = 'rgba(200,245,66,0.04)'; }}
                  onBlur={e => { e.target.style.borderColor = 'var(--border)'; e.target.style.background = 'rgba(255,255,255,0.04)'; }}
                />
              </div>

              {error && (
                <p style={{ color: '#ff6b6b', fontSize: '0.85rem', marginBottom: 12 }}>{error}</p>
              )}

              <button
                onClick={handleSubmit}
                disabled={loading}
                style={{
                  width: '100%', marginTop: 8,
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 10,
                  padding: '14px 32px', borderRadius: '100px',
                  background: loading ? 'rgba(200,245,66,0.5)' : 'var(--accent)',
                  color: '#0a0a0f', fontWeight: 700, fontSize: '0.95rem',
                  border: 'none', cursor: loading ? 'not-allowed' : 'pointer',
                  fontFamily: 'var(--font-body)',
                  boxShadow: '0 0 30px var(--accent-glow)',
                  transition: 'all 0.25s ease',
                }}
              >
                {loading ? '...' : t('submit')}
                {!loading && (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                )}
              </button>

              <p style={{ textAlign: 'center', fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: 16 }}>
                {t('note')}
              </p>
            </>
          ) : (
            <div style={{
              textAlign: 'center', padding: '20px',
              background: 'rgba(200,245,66,0.08)',
              border: '1px solid rgba(200,245,66,0.2)',
              borderRadius: 10, color: 'var(--accent)', fontWeight: 500,
            }}>
              {t('success')}
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}

const inputStyle: React.CSSProperties = {
  width: '100%', padding: '14px 18px',
  background: 'rgba(255,255,255,0.04)',
  border: '1px solid var(--border)',
  borderRadius: 10, color: 'var(--text)',
  fontFamily: 'var(--font-body)', fontSize: '0.95rem',
  transition: 'all 0.2s', outline: 'none',
};

function WhatsAppIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.125.555 4.122 1.528 5.855L0 24l6.335-1.652A11.954 11.954 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.894 0-3.666-.496-5.2-1.362l-.37-.22-3.818.996 1.018-3.704-.243-.382A9.955 9.955 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
    </svg>
  );
}
