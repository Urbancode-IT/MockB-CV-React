import { useRef } from 'react';
import { readFileAsDataUrl } from '../utils/fileHelpers';

export default function ImageField({ label, value, onChange, placeholder = 'https://...' }) {
  const inputRef = useRef(null);

  const handleFile = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) return;
    const dataUrl = await readFileAsDataUrl(file);
    onChange(dataUrl);
    e.target.value = '';
  };

  return (
    <label className="pm-field">
      <span>{label}</span>
      <input
        value={value?.startsWith('data:') ? '(Uploaded image)' : (value || '')}
        onChange={(e) => onChange(e.target.value)}
        autoComplete="off"
        placeholder={placeholder}
        readOnly={value?.startsWith('data:')}
      />
      <div className="pm-file-row">
        <button type="button" className="pm-file-btn" onClick={() => inputRef.current?.click()}>
          <i className="fa-solid fa-upload" /> Upload image
        </button>
        {value ? (
          <button type="button" className="pm-file-btn pm-file-btn--ghost" onClick={() => onChange('')}>
            Clear
          </button>
        ) : null}
      </div>
      <input ref={inputRef} type="file" accept="image/*" hidden onChange={handleFile} />
      {value ? (
        <img className="pm-image-preview" src={value} alt="" />
      ) : null}
    </label>
  );
}
