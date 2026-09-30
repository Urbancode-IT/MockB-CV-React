import { useRef } from 'react';
import { imgFingerprint, readFileAsDataUrl } from '../utils/fileHelpers';

export default function ImageField({ label, value, onChange, placeholder = 'https://...' }) {
  const inputRef = useRef(null);
  const isData = typeof value === 'string' && value.startsWith('data:');

  const handleFile = async (e) => {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file || !file.type.startsWith('image/')) return;
    try {
      const dataUrl = await readFileAsDataUrl(file);
      onChange(dataUrl);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="pm-field">
      <span>{label}</span>
      <input
        value={isData ? '(Uploaded image)' : (value || '')}
        onChange={(e) => onChange(e.target.value)}
        autoComplete="off"
        placeholder={placeholder}
        readOnly={isData}
      />
      <div className="pm-file-row">
        <button
          type="button"
          className="pm-file-btn"
          onClick={(e) => {
            e.preventDefault();
            inputRef.current?.click();
          }}
        >
          <i className="fa-solid fa-upload" /> Upload image
        </button>
        {value ? (
          <button
            type="button"
            className="pm-file-btn pm-file-btn--ghost"
            onClick={(e) => {
              e.preventDefault();
              onChange('');
            }}
          >
            Clear
          </button>
        ) : null}
      </div>
      <input ref={inputRef} type="file" accept="image/*" hidden onChange={handleFile} />
      {value ? (
        <img className="pm-image-preview" key={imgFingerprint(value)} src={value} alt="" />
      ) : null}
    </div>
  );
}
