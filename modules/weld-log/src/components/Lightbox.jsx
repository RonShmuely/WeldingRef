import { useEffect } from 'react';

export default function Lightbox({ src, onClose }) {
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 1000,
        background: 'rgba(0,0,0,0.96)',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
      }}
    >
      <img
        src={src}
        alt=""
        onClick={e => e.stopPropagation()}
        style={{
          maxWidth: '96vw', maxHeight: '90vh',
          objectFit: 'contain', borderRadius: '4px',
        }}
      />
      <div style={{
        color: '#444', fontSize: '12px', fontFamily: 'Arial, sans-serif', marginTop: '14px',
      }}>
        ESC / לחץ לסגירה
      </div>
    </div>
  );
}
