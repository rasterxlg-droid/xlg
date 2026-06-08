'use client';

const WA_HREF = `https://wa.me/77718721766?text=${encodeURIComponent('Привет! Хочу обсудить проект.')}`;

export default function FloatingWhatsApp() {
  return (
    <>
      <div style={{
        position: 'fixed', bottom: 22, right: 22, zIndex: 199,
        width: 68, height: 68, borderRadius: '50%',
        border: '2px solid rgba(37,211,102,0.3)',
        animation: 'fabRing 2.5s ease-in-out infinite',
        pointerEvents: 'none',
      }} />
      <a
        href={WA_HREF}
        target="_blank"
        rel="noopener noreferrer"
        title="WhatsApp"
        style={{
          position: 'fixed', bottom: 28, right: 28, zIndex: 200,
          width: 56, height: 56, borderRadius: '50%',
          background: '#25D366', color: '#fff',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          textDecoration: 'none',
          boxShadow: '0 4px 24px rgba(37,211,102,0.5)',
          transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
          fontSize: '1.4rem',
        }}
        onMouseEnter={e => {
          e.currentTarget.style.transform = 'scale(1.12) translateY(-3px)';
          e.currentTarget.style.boxShadow = '0 8px 36px rgba(37,211,102,0.6)';
        }}
        onMouseLeave={e => {
          e.currentTarget.style.transform = '';
          e.currentTarget.style.boxShadow = '0 4px 24px rgba(37,211,102,0.5)';
        }}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
          <path d="M12 0C5.373 0 0 5.373 0 12c0 2.125.555 4.122 1.528 5.855L0 24l6.335-1.652A11.954 11.954 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.894 0-3.666-.496-5.2-1.362l-.37-.22-3.818.996 1.018-3.704-.243-.382A9.955 9.955 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
        </svg>
      </a>
    </>
  );
}
