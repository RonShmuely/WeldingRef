import { useState, useMemo, useEffect } from 'react';
import EntryCard from './EntryCard.jsx';

const CATS = [
  { key: 'all',    label: 'הכל',   color: '#e0e0e0', active: '#e0e0e0' },
  { key: 'w200i',  label: 'w200i', color: '#f59e0b', active: '#f59e0b' },
  { key: 'w50ri',  label: 'w50ri', color: '#38bdf8', active: '#38bdf8' },
  { key: 'bobcat', label: 'bobcat',color: '#a78bfa', active: '#a78bfa' },
];

function parseDDMMYY(str) {
  if (!str) return null;
  const parts = str.split('.');
  if (parts.length < 3) return null;
  const [d, m, y] = parts;
  const year = parseInt(y) < 100 ? 2000 + parseInt(y) : parseInt(y);
  return new Date(year, parseInt(m) - 1, parseInt(d));
}

const inputStyle = {
  background: '#0e0e0e', border: '1px solid #222', color: '#e0e0e0',
  padding: '10px 12px', borderRadius: '4px', fontFamily: 'Arial, sans-serif',
  fontSize: '14px', minHeight: '44px', outline: 'none',
};

export default function LogView({ entries, onEdit, onDelete, onExportChange, onRefresh }) {
  const [cat, setCat] = useState('all');
  const [search, setSearch] = useState('');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');

  const filtered = useMemo(() => {
    let result = [...entries];

    if (cat !== 'all') {
      result = result.filter(e => e.category === cat);
    }

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(e =>
        [e.machine, e.part, e.description, e.notes].some(f => f && f.toLowerCase().includes(q))
      );
    }

    if (dateFrom) {
      const from = parseDDMMYY(dateFrom);
      if (from) result = result.filter(e => { const d = parseDDMMYY(e.date); return d && d >= from; });
    }

    if (dateTo) {
      const to = parseDDMMYY(dateTo);
      if (to) result = result.filter(e => { const d = parseDDMMYY(e.date); return d && d <= to; });
    }

    result.sort((a, b) => {
      const da = parseDDMMYY(a.date), db = parseDDMMYY(b.date);
      if (da && db) return db - da;
      if (da) return -1;
      if (db) return 1;
      return new Date(b.created || 0) - new Date(a.created || 0);
    });

    return result;
  }, [entries, cat, search, dateFrom, dateTo]);

  useEffect(() => {
    onExportChange(filtered);
  }, [filtered]);

  return (
    <div style={{ padding: '16px', maxWidth: '800px', margin: '0 auto' }}>

      {/* Category toggles */}
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '12px', alignItems: 'center' }}>
        {CATS.map(c => (
          <button
            key={c.key}
            onClick={() => setCat(c.key)}
            style={{
              fontFamily: c.key === 'all' ? 'Arial, sans-serif' : "'Courier New', monospace",
              fontSize: '14px',
              background: cat === c.key ? c.color : 'transparent',
              color: cat === c.key ? '#000' : c.color,
              border: `1px solid ${c.color}`,
              padding: '0 14px', borderRadius: '4px', cursor: 'pointer',
              minHeight: '44px', fontWeight: cat === c.key ? 700 : 400,
            }}
          >
            {c.label}
          </button>
        ))}
        <span style={{ fontFamily: 'Arial, sans-serif', color: '#444', fontSize: '13px', marginRight: 'auto' }}>
          {filtered.length} רשומות
        </span>
      </div>

      {/* Date range */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '12px', flexWrap: 'wrap' }}>
        <input
          type="text"
          placeholder="מ-תאריך DD.MM.YY"
          value={dateFrom}
          onChange={e => setDateFrom(e.target.value)}
          style={inputStyle}
        />
        <input
          type="text"
          placeholder="עד-תאריך DD.MM.YY"
          value={dateTo}
          onChange={e => setDateTo(e.target.value)}
          style={inputStyle}
        />
      </div>

      {/* Search */}
      <input
        type="text"
        placeholder="חיפוש..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        style={{ ...inputStyle, width: '100%', marginBottom: '16px', boxSizing: 'border-box' }}
      />

      {/* Entry list */}
      {filtered.length === 0 ? (
        <div style={{ textAlign: 'center', color: '#444', fontFamily: 'Arial, sans-serif', padding: '48px 0' }}>
          אין רשומות
        </div>
      ) : (
        filtered.map(entry => (
          <EntryCard
            key={entry.id}
            entry={entry}
            onEdit={onEdit}
            onDelete={onDelete}
            onRefresh={onRefresh}
          />
        ))
      )}
    </div>
  );
}
