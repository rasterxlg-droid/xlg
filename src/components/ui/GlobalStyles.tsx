'use client';
import { useEffect } from 'react';

export default function GlobalStyles() {
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

      :root {
        --bg: #0a0a0f;
        --bg-card: #111118;
        --bg-card-hover: #16161f;
        --accent: #c8f542;
        --accent-dim: rgba(200, 245, 66, 0.12);
        --accent-glow: rgba(200, 245, 66, 0.25);
        --text: #f0f0f0;
        --text-muted: #7a7a8a;
        --border: rgba(255,255,255,0.07);
        --radius: 16px;
        --font-display: 'Syne', sans-serif;
        --font-body: 'DM Sans', sans-serif;
      }

      html { scroll-behavior: smooth; }

      body {
        background: var(--bg);
        color: var(--text);
        font-family: var(--font-body);
        font-size: 16px;
        line-height: 1.6;
        overflow-x: hidden;
      }

      body::before {
        content: '';
        position: fixed;
        inset: 0;
        background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E");
        pointer-events: none;
        z-index: 9999;
        opacity: 0.4;
      }

      @keyframes fadeUp {
        from { opacity: 0; transform: translateY(24px); }
        to   { opacity: 1; transform: translateY(0); }
      }

      @keyframes pulse {
        0%, 100% { opacity: 1; transform: scale(1); }
        50% { opacity: 0.5; transform: scale(0.8); }
      }

      @keyframes fabRing {
        0%, 100% { transform: scale(1); opacity: 0.5; }
        50% { transform: scale(1.15); opacity: 0; }
      }
    `;
    document.head.appendChild(style);
    return () => { document.head.removeChild(style); };
  }, []);

  return null;
}
