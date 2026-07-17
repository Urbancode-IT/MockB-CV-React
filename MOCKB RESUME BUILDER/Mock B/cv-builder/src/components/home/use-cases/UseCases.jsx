import React, { useState } from 'react';
import './UseCases.css';

const ACCORDIONS = [
  {
    id: 'acc-1',
    num: '01',
    title: 'Senior Professionals & Executives',
    desc: "You've built a powerful career. MockB CV helps you present it at the level it deserves — with executive-grade formatting and strategic keyword placement that opens C-suite doors.",
    roles: ['VP & Directors', 'C-Level Executives', 'Department Heads', 'Senior Managers']
  },
  {
    id: 'acc-2',
    num: '02',
    title: 'First-Time Job Seekers',
    desc: 'Landing your first job is a big moment. Our AI guides you through every section — even if you have little experience — helping you showcase projects, skills, and potential in the best possible light.',
    roles: ['Fresh Graduates', 'Students & Interns', 'Bootcamp Completers', 'Career Beginners']
  },
  {
    id: 'acc-3',
    num: '03',
    title: 'Professionals Seeking ATS-Friendly Resumes',
    desc: 'Getting past automated filters is half the battle. Our real-time ATS score and keyword optimizer ensures your resume reaches a real human before it gets filtered out by a bot.',
    roles: ['Tech & IT Professionals', 'Finance & Banking', 'Healthcare Workers', 'Corporate Job Hunters']
  },
  {
    id: 'acc-4',
    num: '04',
    title: 'Career Changers & Freelancers',
    desc: 'Pivoting careers or going independent? MockB CV helps you re-frame your existing experience for a brand new industry, building a portfolio and cover letter that tells your story compellingly.',
    roles: ['Industry Switchers', 'Freelance Consultants', 'Gig Economy Workers', 'Entrepreneurs & Founders']
  }
];

export default function UseCases() {
  const [activeAccordion, setActiveAccordion] = useState(null);

  const toggleAccordion = (id) => {
    setActiveAccordion(activeAccordion === id ? null : id);
  };

  return (
    <section id="use-cases" className="container">
      <div className="use-cases-header">
        <p className="use-cases-label">Who It's For</p>
        <h2>For applicants across all career paths</h2>
      </div>

      <div className="accordion-list">
        {ACCORDIONS.map((item) => (
          <div 
            key={item.id} 
            className={`accordion-item ${activeAccordion === item.id ? 'open' : ''}`}
            id={item.id}
          >
            <button className="accordion-trigger" onClick={() => toggleAccordion(item.id)}>
              <span className="acc-num">{item.num}</span>
              <span className="acc-title">{item.title}</span>
              <i className="fa-solid fa-plus acc-icon"></i>
            </button>
            <div className="accordion-body">
              <div className="acc-content">
                <div className="acc-text">
                  <p>{item.desc}</p>
                  <ul className="acc-roles">
                    {item.roles.map((role, rIdx) => (
                      <li key={rIdx}>
                        <i className="fa-solid fa-circle-dot"></i> {role}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
