import React, { useEffect, useRef } from 'react';
import './ATSResults.css';

const METRICS_LIST = [
  { id: 'ats_parse',    icon: 'fa-microchip',       name: 'ATS Parse Rate',                tip: 'How well ATS software can read and extract your resume data.' },
  { id: 'keyword_match',icon: 'fa-key',             name: 'Keywords Match',                tip: 'Relevant industry keywords found in your resume.' },
  { id: 'impact',       icon: 'fa-chart-line',      name: 'Quantifying Impact',            tip: 'Use of numbers, percentages, and measurable achievements.' },
  { id: 'repetition',   icon: 'fa-rotate',          name: 'Repetition',                    tip: 'Repeated words or phrases that weaken your resume.' },
  { id: 'spelling',     icon: 'fa-spell-check',     name: 'Spelling Check',                tip: 'Spelling errors detected across all sections.' },
  { id: 'grammar',      icon: 'fa-font',            name: 'Grammar Check',                 tip: 'Grammatical issues and sentence structure problems.' },
  { id: 'formatting',   icon: 'fa-table-columns',   name: 'Formatting & Layout',           tip: 'ATS-friendly layout with clean sections and standard fonts.' },
  { id: 'skills_match', icon: 'fa-code',            name: 'Skills Match',                  tip: 'Technical and soft skills matching the target role.' },
  { id: 'certs',        icon: 'fa-certificate',     name: 'Certifications & Internships',  tip: 'Presence and relevance of certificates and experience.' },
  { id: 'projects',     icon: 'fa-diagram-project', name: 'Projects',                      tip: 'Quality and relevance of project descriptions.' },
  { id: 'length',       icon: 'fa-ruler-vertical',  name: 'Resume Length & Density',       tip: 'Ideal resume length and white space balance.' },
  { id: 'bullets',      icon: 'fa-list-ul',         name: 'Bullet Points',                 tip: 'Strong, action-verb-led bullet points per section.' },
  { id: 'summary',      icon: 'fa-file-lines',      name: 'Summary Mistakes',              tip: 'Professional summary effectiveness and common pitfalls.' },
];

function getBarColor(pct) {
  if (pct >= 75) return '#22c55e';
  if (pct >= 50) return '#D4C77A';
  if (pct >= 30) return '#f97316';
  return '#ef4444';
}

function getNote(name, pct) {
  if (pct >= 75) return `✓ Strong ${name}`;
  if (pct >= 50) return `⚠ Moderate — room for improvement`;
  return `✗ Needs attention — significant gap detected`;
}

// Animated SVG speedometer
function Speedometer({ score }) {
  const arcRef = useRef(null);
  const needleRef = useRef(null);
  const numRef = useRef(null);

  useEffect(() => {
    const totalLen = 267;
    const fillLen = (score / 100) * totalLen;
    const angle = -90 + (score / 100) * 180;

    const t1 = setTimeout(() => {
      if (arcRef.current) arcRef.current.style.strokeDasharray = `${fillLen} ${totalLen - fillLen}`;
      if (needleRef.current) needleRef.current.style.transform = `rotate(${angle}deg)`;
    }, 100);

    // Count animation
    let start = null;
    const duration = 1500;
    const step = (timestamp) => {
      if (!start) start = timestamp;
      const elapsed = Math.min((timestamp - start) / duration, 1);
      if (numRef.current) numRef.current.textContent = Math.floor(elapsed * score);
      if (elapsed < 1) requestAnimationFrame(step);
    };
    const t2 = setTimeout(() => requestAnimationFrame(step), 100);

    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [score]);

  const scoreLabel = score < 40
    ? { text: '⚠ Poor — Needs Major Improvement', cls: 'label-poor' }
    : score < 60
    ? { text: '🔶 Average — Several Issues Found', cls: 'label-average' }
    : score < 80
    ? { text: '🟡 Good — A Few Improvements Needed', cls: 'label-good' }
    : { text: '✅ Excellent — ATS-Ready Resume!', cls: 'label-excellent' };

  return (
    <div className="speedometer-wrap">
      <h2 className="section-heading">Your ATS Score</h2>
      <div className="speedo-container">
        <svg className="speedo-svg" viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg" style={{ borderRadius: '50%' }}>
          <defs>
            <linearGradient id="scoreGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%"   style={{ stopColor: '#ff4e2a' }} />
              <stop offset="25%"  style={{ stopColor: '#ff8e25' }} />
              <stop offset="50%"  style={{ stopColor: '#fce411' }} />
              <stop offset="75%"  style={{ stopColor: '#b4e333' }} />
              <stop offset="100%" style={{ stopColor: '#82c91e' }} />
            </linearGradient>
            <filter id="outerShadow" x="-30%" y="-30%" width="160%" height="160%">
              <feDropShadow dx="0" dy="8" stdDeviation="10" floodColor="#000" floodOpacity="0.2" />
            </filter>
            <filter id="needleShadow" x="-30%" y="-30%" width="160%" height="160%">
              <feDropShadow dx="3" dy="4" stdDeviation="4" floodColor="#000" floodOpacity="0.25" />
            </filter>
          </defs>
          <circle cx="150" cy="150" r="150" fill="#f0f0f0" />
          <circle cx="150" cy="150" r="135" fill="#ffffff" />
          <path d="M 65 150 A 85 85 0 0 1 235 150" fill="none" stroke="#e6e6e6" strokeWidth="35" strokeLinecap="butt" />
          <path ref={arcRef} className="speedo-arc" d="M 65 150 A 85 85 0 0 1 235 150" fill="none" stroke="url(#scoreGrad)" strokeWidth="35" strokeLinecap="butt" strokeDasharray="0 267" />
          <circle cx="150" cy="150" r="75" fill="#f5f5f5" filter="url(#outerShadow)" />
          <g ref={needleRef} className="speedo-needle-group" style={{ transformOrigin: '150px 150px', transform: 'rotate(-90deg)' }}>
            <path d="M 136 150 A 14 14 0 0 0 164 150 L 153 60 L 147 60 Z" fill="#a0a0a0" filter="url(#needleShadow)" />
          </g>
        </svg>
        <div className="speedo-score-display">
          <span ref={numRef} className="score-num" style={{ color: '#555' }}>0</span>
        </div>
        <div id="score-label" className={`score-label ${scoreLabel.cls}`}>{scoreLabel.text}</div>
      </div>
    </div>
  );
}

// Metric cards with animated SVG circles
function MetricCard({ metric, pct, delay }) {
  const circleRef = useRef(null);
  const circumference = 2 * Math.PI * 35;

  useEffect(() => {
    const t = setTimeout(() => {
      if (circleRef.current) {
        const offset = circumference - (pct / 100) * circumference;
        circleRef.current.style.strokeDasharray = `${circumference}`;
        circleRef.current.style.strokeDashoffset = `${offset}`;
      }
    }, 200);
    return () => clearTimeout(t);
  }, [pct, circumference]);

  const color = '#D4C77A'; // Always yellow as per original design

  return (
    <div className="metric-card" style={{ animationDelay: `${delay}s` }}>
      <div className="metric-content">
        <div className="metric-text-box">
          <span className="metric-name">{metric.name}</span>
          <p className="metric-note">{getNote(metric.name, pct)}</p>
        </div>
        <div className="metric-circle-box">
          <svg className="metric-svg" viewBox="0 0 80 80">
            <circle className="metric-bg" cx="40" cy="40" r="35" />
            <circle
              ref={circleRef}
              className="metric-fill"
              cx="40" cy="40" r="35"
              style={{ stroke: color, strokeDasharray: circumference, strokeDashoffset: circumference }}
            />
          </svg>
          <div className="metric-pct-val" style={{ color }}>{pct}%</div>
        </div>
      </div>
    </div>
  );
}

export { METRICS_LIST };

export default function ATSResults({ score, metrics, strengths, weaknesses }) {
  return (
    <section className="results-section container" id="results-section">

      {/* Speedometer */}
      <Speedometer score={score} />

      {/* 13 Metrics */}
      <div className="metrics-section">
        <h2 className="section-heading">Detailed Analysis</h2>
        <p className="section-sub">Your resume has been checked across 13 critical ATS parameters</p>
        <div className="metrics-grid" id="metrics-grid">
          {METRICS_LIST.map((m, i) => (
            <MetricCard key={m.id} metric={m} pct={metrics[m.id] || 0} delay={i * 0.06} />
          ))}
        </div>
      </div>

      {/* Strengths & Weaknesses */}
      <div className="sw-row">
        <div className="sw-box strength-box">
          <img src="/images/sticker_gif_whatsapp_iphone___Emojis_emoticono_3D_todo_OK_gesto-removebg-preview.png" className="floating-emoji" alt="strength emoji" />
          <i className="fa-solid fa-check bg-icon"></i>
          <div className="sw-header">Strengths</div>
          <ul className="sw-list" id="strengths-list">
            {strengths.map((s, idx) => (
              <li key={idx}>
                <i className="fa-solid fa-circle-check"></i>
                <span><strong>{s.name}</strong> — {s.tip} <em style={{ color: '#fff' }}>({s.score}%)</em></span>
              </li>
            ))}
          </ul>
        </div>
        <div className="sw-box weakness-box">
          <img src="/images/dfghj-removebg-preview.png" className="floating-emoji" alt="weakness emoji" />
          <i className="fa-solid fa-xmark bg-icon"></i>
          <div className="sw-header">Weaknesses</div>
          <ul className="sw-list" id="weaknesses-list">
            {weaknesses.map((w, idx) => (
              <li key={idx}>
                <i className="fa-solid fa-circle-xmark"></i>
                <span><strong>{w.name}</strong> — {w.tip} <em style={{ color: '#fff' }}>({w.score}%)</em></span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
