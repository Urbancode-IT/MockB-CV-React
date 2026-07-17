import React from 'react';
import './AIBDownloadOptions.css';

export default function AIBDownloadOptions() {
  return (
    <section className="download-section">
      <div className="container">
        <div className="section-label">
          <i className="fa-solid fa-download"></i> Export Options
        </div>
        <h2 className="section-title">Download in your preferred format</h2>
        <p className="section-sub">
          Once your resume is ready, download it in the format that suits your application best.
        </p>
        <div className="download-cards">
          <div className="dl-card">
            <div className="dl-icon pdf-icon">
              <i className="fa-solid fa-file-pdf"></i>
            </div>
            <h3>PDF Format</h3>
            <p>
              Pixel-perfect formatting that looks exactly the same on every device. Best for online job applications and email submissions.
            </p>
            <ul className="dl-features">
              <li><i className="fa-solid fa-check"></i> Preserves layout exactly</li>
              <li><i className="fa-solid fa-check"></i> ATS-readable PDF</li>
              <li><i className="fa-solid fa-check"></i> Universal compatibility</li>
            </ul>
          </div>
          <div className="dl-card">
            <div className="dl-icon word-icon">
              <i className="fa-solid fa-file-word"></i>
            </div>
            <h3>Word Format (.docx)</h3>
            <p>
              Fully editable document so you can make final tweaks manually. Perfect for recruiters who request Word format submissions.
            </p>
            <ul className="dl-features">
              <li><i className="fa-solid fa-check"></i> Fully editable content</li>
              <li><i className="fa-solid fa-check"></i> Standard .docx format</li>
              <li><i className="fa-solid fa-check"></i> Compatible with MS Word</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
