import React, { useEffect, useRef, useState } from 'react';
import './HowItWorks.css';

const STEPS = [
  {
    n: '01',
    title: 'Pick a design',
    desc: 'Choose a resume, cover letter, or portfolio template that fits your role.',
    icon: 'fa-table-cells-large',
  },
  {
    n: '02',
    title: 'Fill your story',
    desc: 'Add experience, skills, and projects. The live preview updates as you type.',
    icon: 'fa-pen-to-square',
  },
  {
    n: '03',
    title: 'Polish the look',
    desc: 'Tune colors, fonts, spacing, and section order until it feels right.',
    icon: 'fa-sliders',
  },
  {
    n: '04',
    title: 'Download & share',
    desc: 'Export a PDF resume or cover letter, or download your portfolio as a ZIP.',
    icon: 'fa-download',
  },
];

const STEP_MS = 2600;

export default function HowItWorks() {
  const [animate, setAnimate] = useState(false);
  const [active, setActive] = useState(0);
  const sectionRef = useRef(null);
  const pauseUntilRef = useRef(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimate(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.2 },
    );
    const el = sectionRef.current;
    if (el) observer.observe(el);
    return () => {
      if (el) observer.unobserve(el);
    };
  }, []);

  useEffect(() => {
    if (!animate) return undefined;
    const id = window.setInterval(() => {
      if (Date.now() < pauseUntilRef.current) return;
      setActive((prev) => (prev + 1) % STEPS.length);
    }, STEP_MS);
    return () => window.clearInterval(id);
  }, [animate]);

  const selectStep = (index) => {
    setActive(index);
    pauseUntilRef.current = Date.now() + STEP_MS * 2;
  };

  const progress = STEPS.length <= 1 ? 0 : (active / (STEPS.length - 1)) * 100;

  return (
    <section ref={sectionRef} className={`hiw-section${animate ? ' hiw-section--live' : ''}`}>
      <div className="container">
        <div className="hiw-header">
          <p className="hiw-eyebrow">Simple path</p>
          <h2>How MockB CV works</h2>
          <p>Follow the flow from template to download — one clear path, four steps.</p>
        </div>

        <div className="hiw-flow" aria-label="How MockB CV works path">
          <div className="hiw-rail" aria-hidden="true">
            <div className="hiw-rail-track" />
            <div
              className="hiw-rail-fill"
              style={{ width: animate ? `${progress}%` : '0%' }}
            />
          </div>

          <ol className="hiw-steps">
            {STEPS.map((step, index) => {
              const done = index < active;
              const isActive = index === active;
              return (
                <li
                  key={step.n}
                  className={[
                    'hiw-step',
                    animate ? 'hiw-step--in' : '',
                    isActive ? 'hiw-step--active' : '',
                    done ? 'hiw-step--done' : '',
                  ].filter(Boolean).join(' ')}
                  style={{ '--hiw-delay': `${index * 0.1}s` }}
                >
                  <button
                    type="button"
                    className="hiw-node"
                    onClick={() => selectStep(index)}
                    aria-current={isActive ? 'step' : undefined}
                  >
                    <span className="hiw-node-ring" />
                    <i className={`fa-solid ${step.icon}`}></i>
                  </button>
                  <span className="hiw-num">{step.n}</span>
                  <h3>{step.title}</h3>
                  <p>{step.desc}</p>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
