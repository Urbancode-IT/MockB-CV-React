import './PageLoader.css';

export default function PageLoader({ label = 'Loading MockB CV…' }) {
    return (
        <div className="mb-page-loader" role="status" aria-live="polite" aria-busy="true">
            <div className="mb-page-loader__mark" aria-hidden="true">
                <span className="mb-page-loader__ring" />
                <span className="mb-page-loader__ring mb-page-loader__ring--delay" />
                <i className="fa-solid fa-file-lines" />
            </div>
            <p className="mb-page-loader__brand">MockB CV</p>
            <p className="mb-page-loader__label">{label}</p>
        </div>
    );
}
