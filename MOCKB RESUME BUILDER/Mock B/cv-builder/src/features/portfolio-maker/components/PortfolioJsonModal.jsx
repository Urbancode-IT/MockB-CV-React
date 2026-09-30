import { useEffect, useMemo, useRef, useState } from 'react';
import {
  buildAiPortfolioJsonPrompt,
  mergePortfolioImportJson,
  portfolioJsonString,
} from '../utils/portfolioJson';
import '../../../components/resume/JsonUploadModal.css';

export default function PortfolioJsonModal({ isOpen, onClose, onApply, content }) {
  const [jsonText, setJsonText] = useState('');
  const [error, setError] = useState(null);
  const [showExample, setShowExample] = useState(true);
  const [copied, setCopied] = useState(null);
  const fileInputRef = useRef(null);

  const exampleJson = useMemo(() => portfolioJsonString(content || {}, 2), [content]);
  const aiPrompt = useMemo(() => buildAiPortfolioJsonPrompt(content || {}), [content]);

  useEffect(() => {
    if (!isOpen) return undefined;
    setError(null);
    setCopied(null);
    setShowExample(true);
    return undefined;
  }, [isOpen]);

  if (!isOpen) return null;

  const copyText = async (text, key) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(key);
      window.setTimeout(() => setCopied(null), 1800);
    } catch {
      setError('Could not copy. Select the text and copy manually.');
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      setJsonText(String(event.target?.result || ''));
      setError(null);
    };
    reader.readAsText(file);
    e.target.value = null;
  };

  const handleApply = () => {
    try {
      const parsed = JSON.parse(jsonText);
      onApply(mergePortfolioImportJson(content || {}, parsed));
      onClose();
      setJsonText('');
      setError(null);
    } catch (err) {
      setError(err?.message || 'Invalid JSON. Check syntax and try again.');
    }
  };

  return (
    <div className="jm-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="jm-modal">
        <div className="jm-header">
          <div className="jm-header-left">
            <i className="fa-solid fa-file-code jm-header-icon" />
            <div>
              <h3>Upload Portfolio JSON</h3>
            </div>
          </div>
          <button type="button" className="jm-close" onClick={onClose} aria-label="Close">
            <i className="fa-solid fa-xmark" />
          </button>
        </div>

        <div className="jm-body">
          <p className="jm-desc">
            Import content from a <code>.json</code> file or paste JSON below.
            This updates <strong>portfolio fields only</strong> — your template and design stay the same.
          </p>

          <div className="jm-input-row">
            <button type="button" className="jm-action-btn jm-action-file" onClick={() => fileInputRef.current?.click()}>
              <i className="fa-solid fa-file-arrow-up" />
              <span>Select .json File</span>
            </button>
            <input ref={fileInputRef} type="file" accept=".json,application/json" style={{ display: 'none' }} onChange={handleFileChange} />
            <button type="button" className="jm-action-btn jm-action-example" onClick={() => setShowExample((v) => !v)}>
              <i className="fa-solid fa-eye" />
              <span>{showExample ? 'Hide live JSON' : 'Show live JSON'}</span>
            </button>
          </div>

          {showExample && (
            <div className="jm-example-block">
              <div className="jm-example-bar">
                <span><i className="fa-solid fa-circle-info" /> Live schema from this portfolio</span>
                <div className="jm-example-actions">
                  <button type="button" onClick={() => copyText(exampleJson, 'json')}>
                    <i className="fa-solid fa-copy" />
                    {copied === 'json' ? 'Copied' : 'Copy JSON'}
                  </button>
                  <button type="button" onClick={() => { setJsonText(exampleJson); setError(null); }}>
                    <i className="fa-solid fa-check" />
                    Use in editor
                  </button>
                </div>
              </div>
              <pre className="jm-example-pre">{exampleJson}</pre>
            </div>
          )}

          <div className="jm-ai-block">
            <div className="jm-ai-bar">
              <div>
                <strong>AI fill prompt</strong>
                <p>Copy into ChatGPT or Claude so it returns the same JSON structure with your details.</p>
              </div>
              <button type="button" className="jm-ai-copy" onClick={() => copyText(aiPrompt, 'ai')}>
                <i className="fa-solid fa-wand-magic-sparkles" />
                {copied === 'ai' ? 'Copied prompt' : 'Copy AI prompt'}
              </button>
            </div>
          </div>

          <div className="jm-textarea-section">
            <label className="jm-textarea-label" htmlFor="pm-json-paste">Paste JSON text here</label>
            <textarea
              id="pm-json-paste"
              className="jm-textarea"
              value={jsonText}
              onChange={(e) => { setJsonText(e.target.value); setError(null); }}
              placeholder='{ "name": "...", "role": "...", "projects": [] }'
              spellCheck={false}
            />
            {error ? (
              <div className="jm-error">
                <i className="fa-solid fa-triangle-exclamation" /> {error}
              </div>
            ) : null}
          </div>
        </div>

        <div className="jm-footer">
          <button type="button" className="jm-cancel" onClick={onClose}>Cancel</button>
          <button type="button" className="jm-apply" onClick={handleApply} disabled={!jsonText.trim()}>
            <i className="fa-solid fa-bolt" /> Apply to portfolio
          </button>
        </div>
      </div>
    </div>
  );
}
