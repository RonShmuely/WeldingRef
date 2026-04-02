import { useMemo } from 'react';

const CAT_COLORS = { w200i: '#f59e0b', w50ri: '#38bdf8', bobcat: '#a78bfa' };
const CATS = ['w200i', 'w50ri', 'bobcat'];

function currentMonthKey() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
}

function parseDDMMYY(str) {
  if (!str) return null;
  const parts = str.split('.');
  if (parts.length < 3) return null;
  const [d, m, y] = parts;
  const year = parseInt(y) < 100 ? 2000 + parseInt(y) : parseInt(y);
  const month = String(parseInt(m)).padStart(2, '0');
  return `${year}-${month}`;
}

function topN(map, n = 5) {
  return Object.entries(map)
    .filter(([k]) => k)
    .sort((a, b) => b[1] - a[1])
    .slice(0, n);
}

const cardStyle = {
  background: '#0e0e0e',
  border: '1px solid #1a1a1a',
  borderRadius: '6px',
  padding: '16px 20px',
};

const statLabel = {
  fontFamily: 'Arial, sans-serif',
  color: '#aaa',
  fontSize: '12px',
  marginBottom: '6px',
};

const statValue = {
  fontFamily: 'Arial, sans-serif',
  color: '#e0e0e0',
  fontSize: '28px',
  fontWeight: 700,
};

export default function Dashboard({ entries }) {
  const stats = useMemo(() => {
    const thisMonth = currentMonthKey();

    const perCat = { w200i: 0, w50ri: 0, bobcat: 0 };
    const perMachine = {};
    const perWelder = {};
    const perElectrode = {};
    let thisMonthCount = 0;

    for (const e of entries) {
      if (e.category in perCat) perCat[e.category]++;

      if (e.machine) perMachine[e.machine] = (perMachine[e.machine] || 0) + 1;
      if (e.welder) perWelder[e.welder] = (perWelder[e.welder] || 0) + 1;
      if (e.electrode) perElectrode[e.electrode] = (perElectrode[e.electrode] || 0) + 1;

      if (parseDDMMYY(e.date) === thisMonth) thisMonthCount++;
    }

    const topMachines = topN(perMachine);
    const topWelder = topN(perWelder, 1)[0] || null;
    const topElectrode = topN(perElectrode, 1)[0] || null;

    return { perCat, topMachines, topWelder, topElectrode, thisMonthCount };
  }, [entries]);

  return (
    <div style={{ padding: '16px', maxWidth: '700px', margin: '0 auto' }}>

      {/* Summary row */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '16px' }}>
        <div style={cardStyle}>
          <div style={statLabel}>סה"כ רשומות</div>
          <div style={statValue}>{entries.length}</div>
        </div>
        <div style={cardStyle}>
          <div style={statLabel}>החודש</div>
          <div style={statValue}>{stats.thisMonthCount}</div>
        </div>
      </div>

      {/* Per category */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px', marginBottom: '16px' }}>
        {CATS.map(c => (
          <div key={c} style={{ ...cardStyle, borderTop: `2px solid ${CAT_COLORS[c]}` }}>
            <div style={{ ...statLabel, fontFamily: "'Courier New', monospace", color: CAT_COLORS[c] }}>
              {c}
            </div>
            <div style={{ ...statValue, color: CAT_COLORS[c] }}>
              {stats.perCat[c]}
            </div>
          </div>
        ))}
      </div>

      {/* Top facts row */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '16px' }}>
        <div style={cardStyle}>
          <div style={statLabel}>מכונת ריתוך נפוצה</div>
          <div style={{ fontFamily: 'Arial, sans-serif', color: '#e0e0e0', fontSize: '16px', fontWeight: 600 }}>
            {stats.topWelder ? stats.topWelder[0] : '—'}
          </div>
          {stats.topWelder && (
            <div style={{ fontFamily: 'Arial, sans-serif', color: '#444', fontSize: '12px', marginTop: '4px' }}>
              {stats.topWelder[1]} שימושים
            </div>
          )}
        </div>
        <div style={cardStyle}>
          <div style={statLabel}>אלקטרודה נפוצה</div>
          <div style={{ fontFamily: "'Courier New', monospace", color: '#e0e0e0', fontSize: '16px', fontWeight: 600 }}>
            {stats.topElectrode ? stats.topElectrode[0] : '—'}
          </div>
          {stats.topElectrode && (
            <div style={{ fontFamily: 'Arial, sans-serif', color: '#444', fontSize: '12px', marginTop: '4px' }}>
              {stats.topElectrode[1]} שימושים
            </div>
          )}
        </div>
      </div>

      {/* Top machines */}
      {stats.topMachines.length > 0 && (
        <div style={cardStyle}>
          <div style={{ ...statLabel, marginBottom: '12px' }}>שימוש לפי מכונה</div>
          {stats.topMachines.map(([name, count]) => {
            const pct = entries.length ? Math.round((count / entries.length) * 100) : 0;
            return (
              <div key={name} style={{ marginBottom: '10px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                  <span style={{ fontFamily: 'Arial, sans-serif', color: '#e0e0e0', fontSize: '13px' }}>
                    {name}
                  </span>
                  <span style={{ fontFamily: 'Arial, sans-serif', color: '#aaa', fontSize: '13px' }}>
                    {count}
                  </span>
                </div>
                <div style={{ background: '#1a1a1a', borderRadius: '2px', height: '4px' }}>
                  <div style={{
                    background: '#f59e0b', height: '4px', borderRadius: '2px',
                    width: `${pct}%`, transition: 'width 0.3s',
                  }} />
                </div>
              </div>
            );
          })}
        </div>
      )}

    </div>
  );
}
