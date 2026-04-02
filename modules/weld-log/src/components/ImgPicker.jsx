import { useRef } from 'react';
import { compressImage } from '../utils/compress.js';

export default function ImgPicker({ images, setImages }) {
  const fileRef = useRef();

  const handleFiles = async (files) => {
    const newImgs = [];
    for (const file of files) {
      const blob = await compressImage(file);
      const url = URL.createObjectURL(blob);
      newImgs.push({ blob, url, name: file.name });
    }
    setImages(prev => [...prev, ...newImgs]);
  };

  const remove = (idx) => {
    setImages(prev => {
      const next = [...prev];
      URL.revokeObjectURL(next[idx].url);
      next.splice(idx, 1);
      return next;
    });
  };

  return (
    <div>
      {images.length > 0 && (
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '10px' }}>
          {images.map((img, i) => (
            <div key={i} style={{ position: 'relative' }}>
              <img
                src={img.url}
                alt=""
                style={{
                  width: '80px', height: '80px', objectFit: 'cover',
                  borderRadius: '4px', border: '1px solid #222', display: 'block',
                }}
              />
              <button
                type="button"
                onClick={() => remove(i)}
                style={{
                  position: 'absolute', top: 2, right: 2,
                  background: 'rgba(0,0,0,0.85)', color: '#fff',
                  border: 'none', borderRadius: '50%',
                  width: '20px', height: '20px', cursor: 'pointer',
                  fontSize: '13px', lineHeight: '20px', padding: 0, textAlign: 'center',
                }}
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}

      <button
        type="button"
        onClick={() => fileRef.current?.click()}
        style={{
          fontFamily: 'Arial, sans-serif', background: 'transparent',
          border: '1px dashed #444', color: '#aaa',
          padding: '10px 16px', borderRadius: '4px', cursor: 'pointer',
          minHeight: '44px', fontSize: '14px', width: '100%',
        }}
      >
        + הוסף תמונות
      </button>

      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        multiple
        style={{ display: 'none' }}
        onChange={e => { handleFiles(e.target.files); e.target.value = ''; }}
      />
    </div>
  );
}
