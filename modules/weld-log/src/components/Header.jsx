import ExportButton from './ExportButton.jsx';

const NAVS = [
  { key: 'log',       label: 'יומן' },
  { key: 'add',       label: 'הוסף' },
  { key: 'dashboard', label: 'דשבורד' },
];

export default function Header({ view, setView, exportEntries }) {
  return (
    <header style={{
      position: 'sticky', top: 0, zIndex: 100,
      background: '#0e0e0e', borderBottom: '1px solid #1a1a1a',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '0 16px', height: '56px', gap: '8px',
    }}>
      <div style={{
        fontFamily: "'Courier New', monospace",
        fontSize: '18px', fontWeight: 700, color: '#f59e0b', letterSpacing: '2px',
        flexShrink: 0,
      }}>
        WELD LOG
      </div>

      <nav style={{ display: 'flex', gap: '6px' }}>
        {NAVS.map(({ key, label }) => {
          const active = view === key || (view === 'edit' && key === 'add');
          return (
            <button
              key={key}
              onClick={() => setView(key)}
              style={{
                fontFamily: 'Arial, sans-serif', fontSize: '14px',
                background: active ? '#f59e0b' : 'transparent',
                color: active ? '#000' : '#aaa',
                border: `1px solid ${active ? '#f59e0b' : '#333'}`,
                padding: '0 12px', borderRadius: '4px', cursor: 'pointer',
                minHeight: '44px', fontWeight: active ? 700 : 400,
              }}
            >
              {label}
            </button>
          );
        })}
      </nav>

      <ExportButton entries={exportEntries} />
    </header>
  );
}
