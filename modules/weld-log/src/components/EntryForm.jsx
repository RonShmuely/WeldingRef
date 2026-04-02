import { useState } from 'react';
import { pb } from '../pb.js';
import ImgPicker from './ImgPicker.jsx';

const MACHINES = [
  'Jasic ARC 630',
  'Helvi Compact 406C',
  'Kemppi MinarcMig',
  'BTT FOX 189',
  'Jasic CUT-100',
];

const CATS = ['w200i', 'w50ri', 'bobcat'];
const CAT_COLORS = { w200i: '#f59e0b', w50ri: '#38bdf8', bobcat: '#a78bfa' };

function todayDDMMYY() {
  const d = new Date();
  const dd = String(d.getDate()).padStart(2, '0');
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const yy = String(d.getFullYear()).slice(-2);
  return `${dd}.${mm}.${yy}`;
}

const fieldStyle = {
  background: '#0e0e0e',
  border: '1px solid #222',
  color: '#e0e0e0',
  padding: '10px 12px',
  borderRadius: '4px',
  fontFamily: 'Arial, sans-serif',
  fontSize: '14px',
  width: '100%',
  boxSizing: 'border-box',
  outline: 'none',
  minHeight: '44px',
};

const labelStyle = {
  display: 'block',
  color: '#aaa',
  fontSize: '12px',
  fontFamily: 'Arial, sans-serif',
  marginBottom: '6px',
};

export default function EntryForm({ entry, onSaved, onCancel }) {
  const isEdit = !!entry;

  const [date, setDate] = useState(entry?.date || todayDDMMYY());
  const [category, setCategory] = useState(entry?.category || 'w200i');
  const [machine, setMachine] = useState(entry?.machine || '');
  const [part, setPart] = useState(entry?.part || '');
  const [description, setDescription] = useState(entry?.description || '');
  const [electrode, setElectrode] = useState(entry?.electrode || '');
  const [amperage, setAmperage] = useState(entry?.amperage || '');
  const [welder, setWelder] = useState(entry?.welder || '');
  const [notes, setNotes] = useState(entry?.notes || '');
  const [images, setImages] = useState([]); // new images to upload
  const [saving, setSaving] = useState(false);
  const [err, setErr] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!description.trim()) { setErr('תיאור העבודה הוא שדה חובה'); return; }

    setSaving(true);
    setErr('');
    try {
      const fd = new FormData();
      fd.append('date', date.trim());
      fd.append('category', category);
      fd.append('machine', machine.trim());
      fd.append('part', part.trim());
      fd.append('description', description.trim());
      fd.append('electrode', electrode.trim());
      fd.append('amperage', amperage.trim());
      fd.append('welder', welder);
      fd.append('notes', notes.trim());

      for (const img of images) {
        fd.append('images', img.blob, img.name.replace(/\.[^.]+$/, '.jpg'));
      }

      if (isEdit) {
        await pb.collection('entries').update(entry.id, fd);
      } else {
        await pb.collection('entries').create(fd);
      }

      onSaved();
    } catch {
      setErr('שגיאה בשמירה. בדוק חיבור לשרת.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div style={{ padding: '16px', maxWidth: '600px', margin: '0 auto' }}>
      <form onSubmit={handleSubmit} noValidate>

        {/* Date */}
        <div style={{ marginBottom: '16px' }}>
          <label style={labelStyle}>תאריך</label>
          <input
            type="text"
            value={date}
            onChange={e => setDate(e.target.value)}
            placeholder="DD.MM.YY"
            style={fieldStyle}
          />
        </div>

        {/* Category */}
        <div style={{ marginBottom: '16px' }}>
          <label style={labelStyle}>קטגוריה</label>
          <div style={{ display: 'flex', gap: '8px' }}>
            {CATS.map(c => {
              const active = category === c;
              const color = CAT_COLORS[c];
              return (
                <button
                  key={c}
                  type="button"
                  onClick={() => setCategory(c)}
                  style={{
                    fontFamily: "'Courier New', monospace", fontSize: '14px',
                    background: active ? color : 'transparent',
                    color: active ? '#000' : color,
                    border: `1px solid ${color}`,
                    padding: '0 16px', borderRadius: '4px', cursor: 'pointer',
                    minHeight: '44px', fontWeight: active ? 700 : 400, flex: 1,
                  }}
                >
                  {c}
                </button>
              );
            })}
          </div>
        </div>

        {/* Machine */}
        <div style={{ marginBottom: '16px' }}>
          <label style={labelStyle}>מכונה</label>
          <input
            type="text"
            value={machine}
            onChange={e => setMachine(e.target.value)}
            placeholder={`${category} #...`}
            style={fieldStyle}
          />
        </div>

        {/* Part */}
        <div style={{ marginBottom: '16px' }}>
          <label style={labelStyle}>חלק / רכיב</label>
          <input
            type="text"
            value={part}
            onChange={e => setPart(e.target.value)}
            style={fieldStyle}
          />
        </div>

        {/* Description */}
        <div style={{ marginBottom: '16px' }}>
          <label style={labelStyle}>תיאור העבודה *</label>
          <textarea
            value={description}
            onChange={e => setDescription(e.target.value)}
            rows={3}
            style={{ ...fieldStyle, resize: 'vertical', minHeight: '80px' }}
          />
        </div>

        {/* Electrode + Amperage side by side */}
        <div style={{ display: 'flex', gap: '10px', marginBottom: '16px' }}>
          <div style={{ flex: 2 }}>
            <label style={labelStyle}>אלקטרודה / חוט</label>
            <input
              type="text"
              value={electrode}
              onChange={e => setElectrode(e.target.value)}
              style={fieldStyle}
            />
          </div>
          <div style={{ flex: 1 }}>
            <label style={labelStyle}>אמפר</label>
            <input
              type="text"
              value={amperage}
              onChange={e => setAmperage(e.target.value)}
              style={fieldStyle}
            />
          </div>
        </div>

        {/* Welder machine dropdown */}
        <div style={{ marginBottom: '16px' }}>
          <label style={labelStyle}>מכונת ריתוך</label>
          <select
            value={welder}
            onChange={e => setWelder(e.target.value)}
            style={{ ...fieldStyle, cursor: 'pointer' }}
          >
            <option value="">— בחר —</option>
            {MACHINES.map(m => (
              <option key={m} value={m}>{m}</option>
            ))}
          </select>
        </div>

        {/* Notes */}
        <div style={{ marginBottom: '16px' }}>
          <label style={labelStyle}>הערות</label>
          <textarea
            value={notes}
            onChange={e => setNotes(e.target.value)}
            rows={2}
            style={{ ...fieldStyle, resize: 'vertical', minHeight: '60px' }}
          />
        </div>

        {/* Images */}
        <div style={{ marginBottom: '24px' }}>
          <label style={labelStyle}>תמונות</label>
          <ImgPicker images={images} setImages={setImages} />
        </div>

        {err && (
          <div style={{
            color: '#f87171', fontFamily: 'Arial, sans-serif',
            fontSize: '14px', marginBottom: '16px',
          }}>
            {err}
          </div>
        )}

        {/* Actions */}
        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            type="submit"
            disabled={saving}
            style={{
              flex: 1, fontFamily: 'Arial, sans-serif', fontSize: '15px',
              background: saving ? '#444' : '#f59e0b', color: '#000',
              border: 'none', padding: '0 16px', borderRadius: '4px',
              cursor: saving ? 'default' : 'pointer', minHeight: '48px',
              fontWeight: 700,
            }}
          >
            {saving ? 'שומר...' : isEdit ? 'עדכן' : 'שמור'}
          </button>
          <button
            type="button"
            onClick={onCancel}
            style={{
              fontFamily: 'Arial, sans-serif', fontSize: '15px',
              background: 'transparent', color: '#aaa',
              border: '1px solid #333', padding: '0 16px',
              borderRadius: '4px', cursor: 'pointer', minHeight: '48px',
            }}
          >
            ביטול
          </button>
        </div>

      </form>
    </div>
  );
}
