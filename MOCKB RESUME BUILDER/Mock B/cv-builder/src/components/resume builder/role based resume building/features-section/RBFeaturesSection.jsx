import React from 'react';
import './RBFeaturesSection.css';

const features = [
  {
    icon: 'fa-solid fa-microchip',
    title: 'Deep Tech Stack Integration',
    desc: 'Generic resumes just list skills at the bottom. Our role-based builder intelligently groups your technologies by ecosystem (e.g., Frontend, Backend, Cloud) exactly how technical recruiters prefer to read them.',
    list: [
      'Contextual keyword placement for ATS',
      'Ecosystem-aware layout formatting',
    ],
    img: '/images/RESUME TEMPLATES/file_00000000ca6c7208a76594f2e619499a.png',
    badge: { icon: 'fa-solid fa-bolt', text: 'Keyword Optimized' },
    badgeClass: 'badge-1',
    reverse: false,
  },
  {
    icon: 'fa-solid fa-chart-pie',
    title: 'Impact-Driven Project Showcases',
    desc: "Whether you're a Data Scientist reducing latency or a UI Designer increasing conversion rates, the engine automatically restructures your project section to highlight the metrics that matter most for your role.",
    list: [
      'Role-specific action verbs (e.g., "Architected", "Deployed")',
      'Metric-focused bullet points generation',
    ],
    img: '/images/RESUME TEMPLATES/file_000000009a2872089daf10c7b99ee68d.png',
    badge: { icon: 'fa-solid fa-chart-line', text: '+45% ATS Match' },
    badgeClass: 'badge-2',
    reverse: true,
  },
];

export default function RBFeaturesSection() {
  return (
    <section className="page-features-section container">
      <div className="section-header">
        <h2>The Anatomy of a Perfect IT Resume</h2>
        <p>Discover how our role-based engine crafts the perfect narrative for your specific career path.</p>
      </div>

      {features.map((feat, idx) => (
        <div key={idx} className={`feature-row ${feat.reverse ? 'reverse' : ''}`}>
          <div className="feature-text">
            <div className="feat-icon-box">
              <i className={feat.icon}></i>
            </div>
            <h3>{feat.title}</h3>
            <p>{feat.desc}</p>
            <ul className="feature-list">
              {feat.list.map((item, i) => (
                <li key={i}>
                  <i className="fa-solid fa-check"></i> {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="feature-image glass">
            <img
              src={feat.img}
              alt={feat.title}
            />
            <div className={`floating-badge ${feat.badgeClass}`}>
              <i className={feat.badge.icon}></i> {feat.badge.text}
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}
