import { useState, useRef } from 'react';
import { pb } from '../pb.js';
import { compressImage } from '../utils/compress.js';
import Lightbox from './Lightbox.jsx';

const CAT_COLORS = { w200i: '#f59e0b', w50ri: '#38bdf8', bobcat: '#a78bfa' };

const FIELD_LABELS = [
  ['part',      'חלק / רכיב'],
  ['electrode', 'אלקטרודה / חוט'],
  ['amperage',  'אמפר'],
  ['welder',    'מכונת ריתוך'],
];

export default function EntryCard({ entry, onEdit, onDelete, onRefresh }) {
  const [expanded, setExpanded] = useState(false);
  const [lightbox, setLightbox] = useState(null);
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef();

  const catColor = CAT_COLORS[entry.category] || '#e0e0e0';
  const hasImages = Array.isArray(entry.images) && entry.images.length > 0;

  const getImageUrl = (filename) => pb.files.getUrl(entry, filename);

  const handleAppendImages = async (files) => {
    if (!files || files.length === 0) return;
    setUploading(true);
    try {
      const fd = new FormData();
      for (const file of files) {
        const blob = await compressImage(file);
        fd.append('images', blob, file.name.replace(/\.[^.]+$/, '.jpg'));
      }
      await pb.collection('entries').update(entry.id, fd);
      onRefresh();
    } finally {
      setUploading(false);
    }
  };

  return (
    <>
      <div style={{
        background: '#0e0e0e',
        border: '1px solid #1a1a1a',
        borderRight: `3px solid ${catColor}`,
        borderRadius: '6px',
        marginBottom: '8px',
        overflow: 'hidden',
      }}>
        {/* Collapsed row — tap to expand */}
        <div
          onClick={() => setExpanded(e => !e)}
          style={{
            padding: '12px 16px', cursor: 'pointer',
            display: 'flex', alignItems: 'center', gap: '10px',
          }}
        >
          <span style={{
            fontFamily: "'Courier New', monospace", fontSize: '11px', fontWeight: 700,
            color: catColor, background: `${catColor}1a`,
            padding: '2px 6px', borderRadius: '3px', flexShrink: 0,
          }}>
            {entry.category}
          </span>

          <span style={{ fontFamily: 'Arial, sans-serif', color: '#aaa', fontSize: '13px', flexShrink: 0 }}>
            {entry.date}
          </span>

          {entry.machine && (
            <span style={{
              fontFamily: "'Courier New', monospace", color: '#666', fontSize: '12px', flexShrink: 0,
            }}>
              {entry.machine}
            </span>
          )}

          <span style={{
            fontFamily: 'Arial, sans-serif', color: '#e0e0e0', fontSize: '14px',
            overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', flex: 1,
          }}>
            {entry.description}
          </span>

          {hasImages && (
            <span style={{ flexShrink: 0, fontSize: '14px' }}>📷</span>
          )}

          <span style={{ color: '#333', fontSize: '11px', flexShrink: 0 }}>
            {expanded ? '▲' : '▼'}
          </span>
        </div>

        {/* Expanded content */}
        {expanded && (
          <div style={{ padding: '0 16px 16px', borderTop: '1px solid #1a1a1a' }}>

            {/* Field grid */}
            <div style={{
              display: 'grid', gridTemplateColumns: '1fr 1fr',
              gap: '10px', marginTop: '14px',
            }}>
              {FIELD_LABELS.filter(([key]) => entry[key]).map(([key, label]) => (
                <div key={key}>
                  <div style={{ color: '#444', fontSize: '11px', fontFamily: 'Arial, sans-serif', marginBottom: '3px' }}>
                    {label}
                  </div>
                  <div style={{ color: '#e0e0e0', fontSize: '14px', fontFamily: 'Arial, sans-serif' }}>
                    {entry[key]}
                  </div>
                </div>
              ))}
            </div>

            {entry.notes && (
              <div style={{ marginTop: '12px' }}>
                <div style={{ color: '#444', fontSize: '11px', fontFamily: 'Arial, sans-serif', marginBottom: '3px' }}>
                  הערות
                </div>
                <div style={{ color: '#aaa', fontSize: '14px', fontFamily: 'Arial, sans-serif' }}>
                  {entry.notes}
                </div>
              </div>
            )}

            {/* Image thumbnails */}
            {hasImages && (
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '14px' }}>
                {entry.images.map(img => (
                  <img
                    key={img}
                    src={getImageUrl(img)}
                    alt=""
                    onClick={() => setLightbox(getImageUrl(img))}
                    style={{
                      width: '88px', height: '88px', objectFit: 'cover',
                      borderRadius: '4px', cursor: 'pointer', border: '1px solid #222',
                    }}
                  />
                ))}
              </div>
            )}

            {/* Action buttons */}
            <div style={{ display: 'flex', gap: '8px', marginTop: '16px', flexWrap: 'wrap' }}>
              <button
                onClick={() => onEdit(entry)}
                style={btnStyle('#444', '#e0e0e0')}
              >
                עריכה
              </button>
              <button
                onClick={() => onDelete(entry.id)}
                style={btnStyle('#444', '#f87171')}
              >
                מחק
              </button>
              <button
                onClick={() => fileRef.current?.click()}
                disabled={uploading}
                style={btnStyle('#333', '#aaa')}
              >
                {uploading ? 'מעלה...' : '+ הוסף תמונות'}
              </button>
              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                multiple
                style={{ display: 'none' }}
                onChange={e => { handleAppendImages(e.target.files); e.target.value = ''; }}
              />
            </div>
          </div>
        )}
      </div>

      {lightbox && <Lightbox src={lightbox} onClose={() => setLightbox(null)} />}
    </>
  );
}

function btnStyle(borderColor, color) {
  return {
    fontFamily: 'Arial, sans-serif', fontSize: '14px',
    background: 'transparent', color,
    border: `1px solid ${borderColor}`,
    padding: '0 14px', borderRadius: '4px', cursor: 'pointer',
    minHeight: '44px',
  };
}
