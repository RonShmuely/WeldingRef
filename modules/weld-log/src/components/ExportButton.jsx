import { useState } from 'react';
import { exportXlsx, exportPdf } from '../utils/export.js';

export default function ExportButton({ entries }) {
  const [open, setOpen] = useState(false);

  const btn = (label, onClick) => (
    <button
      onClick={() => { onClick(); setOpen(false); }}
      style={{
        display: 'block', width: '100%', textAlign: 'right',
        fontFamily: 'Arial, sans-serif', fontSize: '14px',
        background: 'transparent', color: '#e0e0e0',
        border: 'none', padding: '10px 16px', cursor: 'pointer',
        minHeight: '44px', whiteSpace: 'nowrap',
      }}
      onMouseEnter={e => e.currentTarget.style.background = '#1a1a1a'}
      onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
    >
      {label}
    </button>
  );

  return (
    <div style={{ position: 'relative' }}>
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          fontFamily: 'Arial, sans-serif', fontSize: '13px',
          background: 'transparent', color: '#aaa',
          border: '1px solid #333', padding: '0 12px',
          borderRadius: '4px', cursor: 'pointer', minHeight: '44px',
        }}
      >
        ייצוא
      </button>

      {open && (
        <>
          <div
            onClick={() => setOpen(false)}
            style={{ position: 'fixed', inset: 0, zIndex: 199 }}
          />
          <div style={{
            position: 'absolute', top: '52px', left: 0,
            background: '#0e0e0e', border: '1px solid #222',
            borderRadius: '4px', zIndex: 200, minWidth: '140px',
            overflow: 'hidden',
          }}>
            {btn('Excel (.xlsx)', () => exportXlsx(entries))}
            {btn('PDF', () => exportPdf(entries))}
          </div>
        </>
      )}
    </div>
  );
}
