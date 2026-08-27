import './ClassicLetter.css';

export default function ClassicLetter({ letterData = {} }) {
    const personal = letterData.personal || {};
    const design = letterData.design || {};
    const accent = design.accentColor || '#1A3A5C';
    const isLetter = design.pageSize === 'letter';
    const paragraphs = String(letterData.body || '')
        .split(/\n+/)
        .map((p) => p.trim())
        .filter(Boolean);
    const contacts = [
        personal.email,
        personal.phone,
        personal.location,
        personal.linkedin,
    ].filter(Boolean);

    const variant = letterData.selectedTemplate || '';
    const font = design.fontFamily || 'Inter';
    const serif = font === 'Lora' || font === 'Playfair Display' || font === 'Merriweather';

    return (
        <article
            className={`cl-classic${variant === 'minimal-letter' ? ' cl-minimal' : ''}${variant === 'editorial-letter' ? ' cl-editorial' : ''}${variant === 'split-letter' ? ' cl-split' : ''}`}
            data-letter-capture=""
            data-align={design.headerAlign || 'left'}
            style={{
                width: isLetter ? '216mm' : '210mm',
                minHeight: isLetter ? '279mm' : '297mm',
                fontFamily: `'${font}', ${serif ? 'Georgia, serif' : 'sans-serif'}`,
                fontSize: `${design.fontSize || 12}pt`,
                lineHeight: design.lineHeight || 1.72,
                padding: `${design.topMargin || 24}mm ${design.sideMargin || 22}mm ${design.bottomMargin || 24}mm`,
                '--cl-accent': accent,
                '--cl-side': `${design.sideMargin || 22}mm`,
                '--cl-name-size': `${design.nameSize || 26}pt`,
                '--cl-name-color': design.applyAccentToName ? accent : '#111',
                '--cl-line-color': design.applyAccentToHeading ? accent : '#222',
            }}
        >
            {variant === 'editorial-letter' && <div className="cl-editorial-rule" />}
            <header className={`cl-classic-header${variant === 'split-letter' ? ' cl-split-header' : ''}`}>
                <h1>{personal.name || 'Your Name'}</h1>
                {personal.jobTitle && <p className="cl-classic-role">{personal.jobTitle}</p>}
                {contacts.length > 0 && (
                    <p className="cl-classic-contact">{contacts.join(' - ')}</p>
                )}
            </header>

            <div className="cl-classic-meta">
                <p className="cl-classic-date">{letterData.date || 'Date'}</p>
                <div className="cl-classic-recipient">
                    {letterData.recipientName && <strong>{letterData.recipientName}</strong>}
                    {letterData.recipientTitle && <span>{letterData.recipientTitle}</span>}
                    {letterData.company && <span>{letterData.company}</span>}
                    {letterData.companyAddress && <span>{letterData.companyAddress}</span>}
                </div>
            </div>

            <p className="cl-classic-greeting">{letterData.greeting || 'Dear Hiring Manager,'}</p>

            <div className="cl-classic-body">
                {paragraphs.length > 0
                    ? paragraphs.map((p, i) => <p key={i}>{p}</p>)
                    : <p className="cl-classic-placeholder">Write your cover letter here.</p>}
            </div>

            <div className="cl-classic-sign">
                <p>{letterData.closing || 'Sincerely,'}</p>
                <strong>{letterData.signature || personal.name || 'Your Name'}</strong>
            </div>
        </article>
    );
}
