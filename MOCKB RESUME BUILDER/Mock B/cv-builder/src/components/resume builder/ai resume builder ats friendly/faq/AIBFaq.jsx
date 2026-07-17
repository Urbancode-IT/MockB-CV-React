import React, { useState } from 'react';
import './AIBFaq.css';

const FAQS = [
  {
    q: 'Do I need to know how to write a resume?',
    a: "No! That's the whole point. Just describe your background naturally in plain text — like you're telling a friend about your career. Our AI takes care of all the professional formatting, language, and structure."
  },
  {
    q: 'Is this resume actually ATS-friendly?',
    a: 'Yes. Our AI uses clean, machine-readable formatting and strategically places industry-relevant keywords that align with modern ATS (Applicant Tracking System) requirements. Your resume is designed to pass automated screening.'
  },
  {
    q: 'Can I make changes after the resume is generated?',
    a: 'Absolutely. After the AI generates your resume, a "Request Changes" box appears. Simply type what you want changed — like "add more bullet points to my experience" or "change my summary tone to be more executive" — and the AI updates it instantly.'
  },
  {
    q: "What information should I include in my prompt?",
    a: "For the best resume, include: your full name, target job title, years of experience, company names and roles with dates, key responsibilities and achievements, education details, technical and soft skills, certifications, and the type of role you're applying for."
  },
  {
    q: 'Is the download free?',
    a: 'Yes, generating and previewing your resume is completely free. PDF and Word downloads are available. Premium features like unlimited regenerations and custom templates are available with a MockB CV Pro plan.'
  }
];

export default function AIBFaq() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="faq-section">
      <div className="container">
        <div className="section-label">
          <i className="fa-solid fa-circle-question"></i> FAQ
        </div>
        <h2 className="section-title">Frequently Asked Questions</h2>
        <div className="faq-list">
          {FAQS.map((faq, index) => (
            <div
              className={`faq-item ${openIndex === index ? 'open' : ''}`}
              key={index}
              onClick={() => toggleFaq(index)}
            >
              <div className="faq-q">
                <span>{faq.q}</span>
                <i className="fa-solid fa-plus"></i>
              </div>
              <div className="faq-a">
                {faq.a}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
