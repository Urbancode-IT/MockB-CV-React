import { useState } from 'react';
import '../resume/ResumeEditorForm.css';

const Field = ({ label, children }) => (
    <label className="ref-field">
        <span className="ref-label">{label}</span>
        {children}
    </label>
);

export default function CoverLetterEditorForm({ letterData, setLetterData, onPreviewFocus }) {
    const [open, setOpen] = useState('personal');
    const personal = letterData.personal || {};

    const setPersonal = (key, value) => {
        setLetterData((prev) => ({
            ...prev,
            personal: { ...(prev.personal || {}), [key]: value },
        }));
    };

    const setField = (key, value) => {
        setLetterData((prev) => ({ ...prev, [key]: value }));
    };

    const Section = ({ id, icon, title, children }) => (
        <div className="ref-section">
            <button type="button" className="ref-section-toggle" onClick={() => setOpen(open === id ? null : id)}>
                <span className="ref-section-toggle-left">
                    <i className={`fa-solid ${icon}`}></i>
                    {title}
                </span>
                <i className={`fa-solid fa-chevron-down ref-chevron${open === id ? ' is-open' : ''}`}></i>
            </button>
            {open === id && <div className="ref-section-body">{children}</div>}
        </div>
    );

    return (
        <form className="ref-form" onSubmit={(e) => e.preventDefault()}>
            <Section id="personal" icon="fa-user" title="Your details">
                <Field label="Full name">
                    <input
                        className="ref-input"
                        value={personal.name || ''}
                        onFocus={() => onPreviewFocus?.('name')}
                        onBlur={() => onPreviewFocus?.(null)}
                        onChange={(e) => setPersonal('name', e.target.value)}
                    />
                </Field>
                <Field label="Job title">
                    <input className="ref-input" value={personal.jobTitle || ''} onChange={(e) => setPersonal('jobTitle', e.target.value)} />
                </Field>
                <Field label="Email">
                    <input className="ref-input" value={personal.email || ''} onChange={(e) => setPersonal('email', e.target.value)} />
                </Field>
                <Field label="Phone">
                    <input className="ref-input" value={personal.phone || ''} onChange={(e) => setPersonal('phone', e.target.value)} />
                </Field>
                <Field label="Location">
                    <input className="ref-input" value={personal.location || ''} onChange={(e) => setPersonal('location', e.target.value)} />
                </Field>
                <Field label="LinkedIn">
                    <input className="ref-input" value={personal.linkedin || ''} onChange={(e) => setPersonal('linkedin', e.target.value)} />
                </Field>
            </Section>

            <Section id="recipient" icon="fa-building" title="Recipient">
                <Field label="Date">
                    <input className="ref-input" value={letterData.date || ''} onChange={(e) => setField('date', e.target.value)} />
                </Field>
                <Field label="Hiring manager">
                    <input className="ref-input" value={letterData.recipientName || ''} onChange={(e) => setField('recipientName', e.target.value)} />
                </Field>
                <Field label="Their title">
                    <input className="ref-input" value={letterData.recipientTitle || ''} onChange={(e) => setField('recipientTitle', e.target.value)} />
                </Field>
                <Field label="Company">
                    <input className="ref-input" value={letterData.company || ''} onChange={(e) => setField('company', e.target.value)} />
                </Field>
                <Field label="Company address">
                    <input className="ref-input" value={letterData.companyAddress || ''} onChange={(e) => setField('companyAddress', e.target.value)} />
                </Field>
            </Section>

            <Section id="letter" icon="fa-envelope" title="Letter">
                <Field label="Greeting">
                    <input className="ref-input" value={letterData.greeting || ''} onChange={(e) => setField('greeting', e.target.value)} />
                </Field>
                <Field label="Body">
                    <textarea
                        className="ref-input ref-textarea"
                        rows={12}
                        value={letterData.body || ''}
                        onChange={(e) => setField('body', e.target.value)}
                    />
                </Field>
                <Field label="Closing">
                    <input className="ref-input" value={letterData.closing || ''} onChange={(e) => setField('closing', e.target.value)} />
                </Field>
                <Field label="Signature">
                    <input className="ref-input" value={letterData.signature || ''} onChange={(e) => setField('signature', e.target.value)} />
                </Field>
            </Section>
        </form>
    );
}
