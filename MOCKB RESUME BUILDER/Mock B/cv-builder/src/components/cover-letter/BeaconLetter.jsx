import './BeaconLetter.css';

export default function BeaconLetter({ letterData = {} }) {
    const personal = letterData.personal || {};
    const design = letterData.design || {};
    const green = design.accentColor || '#6EE7B7';
    const navy = '#1E3A8A';
    const isLetter = design.pageSize === 'letter';
    const paragraphs = String(letterData.body || '')
        .split(/\n+/)
        .map((p) => p.trim())
        .filter(Boolean);

    return (
        <article
            className="cl-beacon"
            data-letter-capture=""
            style={{
                width: isLetter ? '216mm' : '210mm',
                minHeight: isLetter ? '279mm' : '297mm',
                height: isLetter ? '279mm' : '297mm',
                '--cl-green': green,
                '--cl-navy': navy,
                fontFamily: `'${design.fontFamily || 'Inter'}', sans-serif`,
                fontSize: `${design.fontSize || 11}pt`,
                lineHeight: design.lineHeight || 1.65,
            }}
        >
            <div className="cl-beacon-stripe cl-beacon-stripe--top" />
            <div className="cl-beacon-chevrons cl-beacon-chevrons--top" aria-hidden="true">
                <span /><span /><span />
            </div>

            <header className="cl-beacon-header">
                <div className="cl-beacon-logo" aria-hidden="true">
                    <i className="fa-solid fa-check" />
                </div>
                <div>
                    <h1>{personal.name || 'Your Name'}</h1>
                    <p>{personal.jobTitle || 'Join the best business'}</p>
                </div>
            </header>

            <div className="cl-beacon-row">
                <div className="cl-beacon-to">
                    <span className="cl-beacon-label">To</span>
                    {letterData.recipientName && <strong>{letterData.recipientName}</strong>}
                    {letterData.recipientTitle && <span>{letterData.recipientTitle}</span>}
                    {letterData.company && <b>{letterData.company}</b>}
                    {personal.phone && <span>P: {personal.phone}</span>}
                    {personal.email && <span>M: {personal.email}</span>}
                </div>
                <p className="cl-beacon-date">Date: {letterData.date || 'Date'}</p>
            </div>

            {letterData.greeting && <p className="cl-beacon-greet">{letterData.greeting}</p>}

            <div className="cl-beacon-body">
                {paragraphs.length > 0
                    ? paragraphs.map((p, i) => <p key={i}>{p}</p>)
                    : <p>Write your cover letter here.</p>}
            </div>

            <div className="cl-beacon-sign">
                <p className="cl-beacon-script">{letterData.signature || personal.name || 'Your Name'}</p>
                <p className="cl-beacon-sign-name">{letterData.signature || personal.name}</p>
                {personal.jobTitle && <p className="cl-beacon-sign-role">{personal.jobTitle}</p>}
            </div>

            <aside className="cl-beacon-footer">
                {personal.phone && (
                    <p><i className="fa-solid fa-phone" /><span>{personal.phone}</span></p>
                )}
                {(personal.linkedin || personal.website) && (
                    <p><i className="fa-solid fa-globe" /><span>{personal.website || personal.linkedin}</span></p>
                )}
                {personal.email && (
                    <p><i className="fa-solid fa-envelope" /><span>{personal.email}</span></p>
                )}
                {personal.location && (
                    <p><i className="fa-solid fa-location-dot" /><span>{personal.location}</span></p>
                )}
            </aside>

            <div className="cl-beacon-chevrons cl-beacon-chevrons--bottom" aria-hidden="true">
                <span /><span /><span /><span />
            </div>
        </article>
    );
}
